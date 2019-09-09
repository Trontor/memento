import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Inject,
  forwardRef
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

  async updateFamily(familyId: string, input: UpdateFamilyInput) {}

  async createFamily(
    currentUser: User,
    input: CreateFamilyInput
  ): Promise<Family> {
    // TODO: use mongo sessions to ensure causal consistency
    // Just a simple implementatio for now

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

  async getFamily(id: string): Promise<FamilyDocument> {
    const objId = fromHexStringToObjectId(id);
    const family = await this.FamilyModel.findById(objId);
    if (!family) throw new FamilyNotFoundException();
    this.logger.log(`get family: ${family.id}`);
    return family;
  }

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
}
