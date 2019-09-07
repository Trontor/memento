import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InviteDocument } from "./schema/invite.schema";
import { Model } from "mongoose";
import uuidv4 from "uuid/v4";
import { mapDocumentToInviteDTO } from "./schema/invite.mapper";
import { Invite } from "./dto/invite.dto";
import { InviteNotFoundException } from "./invite.exception";

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);
  constructor(
    @InjectModel("Invite") private readonly InviteModel: Model<InviteDocument>
  ) {}

  async getInvite(inviteId: string): Promise<Invite> {
    const invite = await this.InviteModel.findById(inviteId);
    if (!invite) throw new InviteNotFoundException();
    return mapDocumentToInviteDTO(invite);
  }
  async createInvite(familyId: string): Promise<Invite> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24);
    this.logger.log(`${now} => ${tomorrow}`);
    let invite: InviteDocument = new this.InviteModel({
      _id: uuidv4(),
      familyId: familyId,
      createdAt: now,
      expiresAt: tomorrow
    });
    invite = await invite.save();
    this.logger.debug(invite);
    return mapDocumentToInviteDTO(invite);
  }
}
