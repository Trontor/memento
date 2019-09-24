import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  NotImplementedException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "../user/dto/user.dto";
import { CreateFamilyInput, UpdateFamilyInput } from "./inputs/family.inputs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FamilyDocument, IUpdateFamilyData } from "./schema/family.schema";
import { UserService } from "../user/user.service";
import { FamilyRole } from "../user/dto/role.dto";
import { Family } from "./dto/family.dto";
import { mapDocumentToFamilyDTO } from "./schema/family.mapper";
import {
  FamilyNotFoundException,
  CreateFamilyException,
  AlreadyJoinedFamilyException,
} from "./family.exceptions";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { InviteService } from "../invite/invite.service";
import { isValidInvite } from "../invite/invite.util";
import { InviteExpiredException } from "../invite/invite.exception";
import { isUserInFamily } from "../user/user.util";
import { FileService } from "../file/file.service";
import { FamiliesDataLoader } from "./family.data-loader";

/**
 * Manages CRUD for families, and joining families.
 */
@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(
    @InjectModel("Family")
    private readonly FamilyModel: Model<FamilyDocument>,
    private readonly userService: UserService,
    private readonly inviteService: InviteService,
    private readonly fileService: FileService,
    // used for `find` only. Batches and caches by family id.
    private readonly familiesDataLoader: FamiliesDataLoader,
  ) {
    this.logger.debug("Creating new instance...");
  }

  /**
   * Returns the requested family model.
   * @param id id of family
   */
  async getFamily(id: string): Promise<FamilyDocument> {
    const family: FamilyDocument = await this.familiesDataLoader.load(id);
    if (!family) throw new FamilyNotFoundException();
    this.logger.log(`get family: ${family.id}`);
    return family;
  }

  /**
   * Fetches and returns families in a batch.
   * @param familyIds batch of family ids
   */
  async getFamilies(familyIds: string[]): Promise<Family[]> {
    if (familyIds.length === 0) return [];
    // more efficient to retrieve all docs in one round trip
    const docs = await this.familiesDataLoader.loadMany(familyIds);
    return docs.map(doc => mapDocumentToFamilyDTO(doc));
  }

  /**
   * Creates a new family and adds the creating user to the family.
   * @param currentUser user making the request
   * @param input fields to create the family
   */
  async createFamily(
    currentUser: User,
    input: CreateFamilyInput,
  ): Promise<Family> {
    // TODO: use mongo sessions to ensure causal consistency
    const { image, ...fields } = input;
    let imageUrl: string | undefined = undefined;

    // upload family image if provided
    if (image) {
      imageUrl = await this.fileService.uploadImage(image);
    }

    // insert family
    const familyId = Types.ObjectId();
    this.logger.debug(familyId);
    let doc: FamilyDocument = new this.FamilyModel({
      _id: familyId,
      ...fields,
      memberIds: [currentUser.userId],
    });
    if (imageUrl) doc.imageUrl = imageUrl;
    this.logger.debug(doc);

    try {
      await doc.save();
    } catch (err) {
      this.logger.error(err);
      throw new CreateFamilyException();
    }

    // make the creating user a family admin
    await this.userService.createRole(currentUser.userId, {
      familyId: familyId.toHexString(),
      familyRole: FamilyRole.Admin,
    });

    return mapDocumentToFamilyDTO(doc);
  }

  /**
   * Allows current user to join a family.
   * @param currentUser current User making the request
   * @param inviteId id of invite to join family
   */
  async joinFamily(currentUser: User, inviteId: string): Promise<Family> {
    const invite = await this.inviteService.getInvite(inviteId);
    if (!isValidInvite(invite)) {
      this.logger.log(`invite ${inviteId} has expired`);
      throw new InviteExpiredException();
    }
    if (isUserInFamily(currentUser, invite.familyId)) {
      this.logger.log(
        `user ${currentUser.userId} is already in family ${invite.familyId}`,
      );
      throw new AlreadyJoinedFamilyException();
    }

    // TODO: use MongoDB session for causal consistency
    const familyDoc = await this.addFamilyMembers(
      [currentUser.userId],
      invite.familyId,
    );
    await this.userService.createRole(currentUser.userId, {
      familyId: invite.familyId,
      familyRole: FamilyRole.Normal,
    });
    return mapDocumentToFamilyDTO(familyDoc);
  }

  /**
   * Updates an existing family's data.
   * @param user user making the update request
   * @param input update fields
   */
  async updateFamily(user: User, input: UpdateFamilyInput) {
    const { familyId, image, ...data } = input;
    const hasData: boolean = Object.keys(data).length > 0;
    if (!hasData) {
      throw new BadRequestException("No data provided in UpdateFamilyInput");
    }
    this.logger.log(`User ${user.userId} updating ${JSON.stringify(input)}`);

    // upload image if provided
    let imageUrl: string | undefined = undefined;
    if (image) {
      this.logger.log("Image was provided: uploading...");
      imageUrl = await this.fileService.uploadImage(image);
    }

    const updateData: IUpdateFamilyData = data;
    if (imageUrl) updateData.imageUrl = imageUrl;
    const updatedFamily: FamilyDocument = await this.updateFamilyDocument(
      familyId,
      data,
    );

    const familyDTO: Family = mapDocumentToFamilyDTO(updatedFamily);
    this.logger.debug(familyDTO);
    return familyDTO;
  }

  /**
   * Updates family document with `data` and clears the cache.
   * @param familyId id of family to update
   * @param data update data
   */
  private async updateFamilyDocument(
    familyId: string,
    data: IUpdateFamilyData,
  ) {
    // do update operation
    const updatedFamily = await this.FamilyModel.findOneAndUpdate(
      { _id: familyId },
      data,
      { new: true },
    );
    if (!updatedFamily)
      throw new InternalServerErrorException("Could not update family");

    // clear the cache for this family
    this.familiesDataLoader.clear(familyId);
    return updatedFamily;
  }

  /**
   * Updates family model with new members and clears the cache.
   * @param newMemberIds ids of new family members
   * @param familyId id of family
   */
  private async addFamilyMembers(
    newMemberIds: string[],
    familyId: string,
  ): Promise<FamilyDocument> {
    const doc = await this.FamilyModel.findOneAndUpdate(
      {
        _id: familyId,
      },
      {
        $addToSet: {
          memberIds: { $each: newMemberIds },
        },
      },
      {
        new: true,
      },
    );
    if (!doc) throw new FamilyNotFoundException();

    // clear the cache for this family
    this.familiesDataLoader.clear(familyId);
    return doc;
  }
}
