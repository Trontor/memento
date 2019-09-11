import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Inject,
  forwardRef
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InviteDocument } from "./schema/invite.schema";
import { Model } from "mongoose";
import uuidv4 from "uuid/v4";
import { mapDocumentToInviteDTO } from "./schema/invite.mapper";
import { Invite } from "./dto/invite.dto";
import {
  InviteNotFoundException,
  InviteExpiredException
} from "./invite.exception";
import { isValidInvite } from "./invite.util";
import { User } from "../user/dto/user.dto";
import { MailerService, ISendMailOptions } from "@nest-modules/mailer";
import { ConfigService } from "../config/config.service";
import { FamilyService } from "../family/family.service";

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);
  constructor(
    @InjectModel("Invite") private readonly InviteModel: Model<InviteDocument>,
    @Inject(forwardRef(() => FamilyService))
    private readonly familyService: FamilyService,
    private readonly configService: ConfigService,
    private readonly mailService: MailerService
  ) {}

  async sendInvitesByEmail(inviter: User, familyId: string, emails: string[]) {
    const familyPromise = this.familyService.getFamily(familyId);
    const invitePromise = this.createInvite(inviter, familyId);

    const family = await familyPromise;
    const invite = await invitePromise;

    // validate email
    const promises = [];
    for (let email of emails) {
      // define message
      const mailOptions: ISendMailOptions = {
        to: email,
        subject: `You're invited to the ${family.name} Family!`,
        template: "invite",
        context: {
          familyName: family.name,
          inviterName: `${inviter.firstName} ${inviter.lastName}`,
          inviteLink: `https://memento-it-project.herokuapp.com/invites/inviteId=${invite.inviteId}`
        }
      };
      promises.push(this.mailService.sendMail(mailOptions));
    }
    try {
      const results = await Promise.all(promises.map(p => p.catch(err => err)));
      this.logger.debug(results);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return invite;
  }

  async getInvite(inviteId: string): Promise<Invite> {
    const invite = await this.InviteModel.findById(inviteId);
    if (!invite) throw new InviteNotFoundException();
    if (!isValidInvite(invite)) throw new InviteExpiredException();
    return mapDocumentToInviteDTO(invite);
  }
  async createInvite(inviter: User, familyId: string): Promise<Invite> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24);
    this.logger.log(`${now} => ${tomorrow}`);
    let invite: InviteDocument = new this.InviteModel({
      _id: uuidv4(),
      inviterId: inviter.userId,
      familyId: familyId,
      createdAt: now,
      expiresAt: tomorrow
    });
    invite = await invite.save();
    this.logger.debug(invite);
    return mapDocumentToInviteDTO(invite);
  }
}
