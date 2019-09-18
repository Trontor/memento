import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Inject,
  forwardRef,
  NotImplementedException
} from "@nestjs/common";
import { User } from "../user/dto/user.dto";
import { CreateFamilyInput, UpdateFamilyInput } from "./inputs/family.inputs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FamilyDocument } from "./schema/family.schema";
import { UserService } from "../user/user.service";
import { FamilyRole } from "../user/dto/role.dto";
import { Family } from "./dto/family.dto";
import { mapDocumentToFamilyDTO } from "./schema/family.mapper";
import {
  FamilyNotFoundException,
  CreateFamilyException,
  AlreadyJoinedFamilyException
} from "./family.exceptions";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { InviteService } from "../invite/invite.service";
import { isValidInvite } from "../invite/invite.util";
import { InviteExpiredException } from "../invite/invite.exception";
import { isUserInFamily } from "../user/user.util";

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
    private readonly inviteService: InviteService
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
        $in: familyIds.map(id => fromHexStringToObjectId(id))
      }
    });
    return docs.map(doc => mapDocumentToFamilyDTO(doc));
  }

  /**
   * Creates a new family and adds the creating user to the family.
   * @param currentUser user making the request
   * @param input fields to create the family
   */
  async createFamily(
    currentUser: User,
    input: CreateFamilyInput
  ): Promise<Family> {
    // TODO: use mongo sessions to ensure causal consistency
    // insert family
    const familyId = Types.ObjectId();
    this.logger.debug(familyId);
    const doc = new this.FamilyModel({
      _id: familyId,
      ...input,
      memberIds: [currentUser.userId]
    });
    this.logger.debug(doc);

    let familyDoc: FamilyDocument;
    try {
      familyDoc = await doc.save();
    } catch (err) {
      this.logger.error(err);
      throw new CreateFamilyException();
    }

    // make the creating user a family admin
    await this.userService.createRole(currentUser.userId, {
      familyId: familyId.toHexString(),
      familyRole: FamilyRole.Admin
    });

    return mapDocumentToFamilyDTO(familyDoc);
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
        `user ${currentUser.userId} is already in family ${invite.familyId}`
      );
      throw new AlreadyJoinedFamilyException();
    }

    // TODO: use MongoDB session for causal consistency
    const familyDoc = await this.addFamilyMembers(
      [currentUser.userId],
      invite.familyId
    );
    await this.userService.createRole(currentUser.userId, {
      familyId: invite.familyId,
      familyRole: FamilyRole.Normal
    });
    return mapDocumentToFamilyDTO(familyDoc);
  }

  /**
   * Updates an existing family's data.
   * @param familyId id of family to update
   * @param input update fields
   */
  async updateFamily(familyId: string, input: UpdateFamilyInput) {
    throw new NotImplementedException();
  }

  /**
   * Updates family model with new members.
   * @param newMemberIds ids of new family members
   * @param familyId id of family
   */
  private async addFamilyMembers(
    newMemberIds: string[],
    familyId: string
  ): Promise<FamilyDocument> {
    const doc = await this.FamilyModel.findOneAndUpdate(
      {
        _id: familyId
      },
      {
        $addToSet: {
          memberIds: { $each: newMemberIds }
        }
      },
      {
        new: true
      }
    );
    if (!doc) throw new FamilyNotFoundException();
    return doc;
  }
}
