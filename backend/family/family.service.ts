import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
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

/**
 * Manages CRUD for families, and joining families.
 */
@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(
    @InjectModel("Family")
    private readonly FamilyModel: Model<FamilyDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => InviteService))
    private readonly inviteService: InviteService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Returns the requested family model.
   * @param id id of family
   */
  async getFamily(id: string): Promise<FamilyDocument> {
    const objId = fromHexStringToObjectId(id);
    const family = await this.FamilyModel.findById(objId);
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
    const docs = await this.FamilyModel.find({
      _id: {
        $in: familyIds.map(id => fromHexStringToObjectId(id)),
      },
    });
    return docs.map(doc => doc.toDTO());
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

    return doc.toDTO();
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
    return familyDoc.toDTO();
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

    // do update operation
    const updatedFamily = await this.FamilyModel.findOneAndUpdate(
      { _id: familyId },
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedFamily)
      throw new InternalServerErrorException("Could not update family");
    const familyDTO: Family = updatedFamily.toDTO();
    this.logger.debug(familyDTO);
    return familyDTO;
  }

  /**
   * Updates family model with new members.
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
    return doc;
  }
}
