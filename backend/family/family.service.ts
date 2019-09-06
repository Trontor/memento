import {
  Injectable,
  Logger,
  InternalServerErrorException
} from "@nestjs/common";
import { User } from "../user/dto/user.dto";
import { CreateFamilyInput } from "./inputs/family.inputs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FamilyDocument } from "./schema/family.schema";
import { UserService } from "../user/user.service";
import { FamilyRole } from "../user/dto/role.dto";
import { Family } from "./dto/family.dto";
import { mapDocumentToFamilyDTO } from "./schema/family.mapper";
import { FamilyNotFoundException } from "./family.exceptions";
import { fromHexStringToObjectId } from "../common/mongo.util";

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(
    @InjectModel("Family")
    private readonly FamilyModel: Model<FamilyDocument>,
    private readonly userService: UserService
  ) {}

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
      members: currentUser.userId
    });
    this.logger.debug(doc);

    let familyDoc: FamilyDocument;
    try {
      familyDoc = await doc.save();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        "Family document could not be created"
      );
    }

    // make the creating user a family admin
    await this.userService.createRole(currentUser.userId, {
      familyId: familyId.toHexString(),
      familyRole: FamilyRole.Admin
    });

    return mapDocumentToFamilyDTO(familyDoc);
  }

  async getFamily(id: string): Promise<Family> {
    const objId = fromHexStringToObjectId(id);
    const family = await this.FamilyModel.findById(objId);
    if (!family) throw new FamilyNotFoundException();
    this.logger.log(`get family: ${family.id}`);
    return mapDocumentToFamilyDTO(family);
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
