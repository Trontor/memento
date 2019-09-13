import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InviteDocument } from "./schema/invite.schema";
import { Model } from "mongoose";
import uuidv4 from "uuid/v4";
import { mapDocumentToInviteDTO } from "./schema/invite.mapper";
import { Invite, FailedInviteOutput } from "./dto/invite.dto";
import {
  InviteNotFoundException,
  InviteExpiredException
} from "./invite.exception";
import { isValidInvite } from "./invite.util";
import { User } from "../user/dto/user.dto";
import { MailerService, ISendMailOptions } from "@nest-modules/mailer";
import { ConfigService } from "../config/config.service";
import { FamilyService } from "../family/family.service";
import Joi from "@hapi/joi";
import { Family } from "../family/dto/family.dto";
import { join } from "path";

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);
  constructor(
    @InjectModel("Invite") private readonly InviteModel: Model<InviteDocument>,
    @Inject(forwardRef(() => FamilyService))
    private readonly familyService: FamilyService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  async sendInvitesByEmail(inviter: User, familyId: string, emails: string[]) {
    const familyPromise = this.familyService.getFamily(familyId);
    const invitePromise = this.createInvite(inviter, familyId);

    const family = await familyPromise;
    const invite = await invitePromise;

    const seenEmails = new Set<string>();
    const sent: string[] = [];
    const failed: FailedInviteOutput[] = [];
    const promises: Promise<any>[] = [];

    for (let email of emails.map(e => e.toLowerCase())) {
      if (seenEmails.has(email)) {
        // duplicate email
        failed.push({ email, error: "Duplicate email" });
      } else {
        seenEmails.add(email);
        const promise = this.sendInviteByEmailPromise(
          inviter,
          invite,
          family,
          email
        )
          .then(email => {
            // successfully sent to this email
            sent.push(email);
          })
          .catch(err => {
            // catch invalid email
            this.logger.error(err);
            failed.push({ email: err.message, error: "Invalid email" });
          });
        promises.push(promise);
      }
    }

    // await promises
    await Promise.all(promises);
    // this.logger.debug(results);
    // this.logger.debug(failed);
    // this.logger.debug(sent);
    return { sent, failed };
  }

  private async sendInviteByEmailPromise(
    inviter: User,
    invite: Invite,
    family: Family,
    email: string
  ) {
    // validate email syntax
    const validatedEmail: Joi.ValidationResult<string> = Joi.validate(
      email,
      Joi.string().email({ minDomainSegments: 2 })
    );
    if (validatedEmail.error) {
      this.logger.error(email);
      throw new Error(email);
    }

    const inviteLink: string =
      "https://" +
      this.configService.hostName +
      `/invites/inviteId=${invite.inviteId}`;

    // define message
    const mailOptions: ISendMailOptions = {
      to: email,
      subject: `You're invited to the ${family.name} Family!`,
      template: "invite", // name of template "invite.hbs"
      context: {
        familyName: family.name,
        inviterName: `${inviter.firstName} ${inviter.lastName}`,
        inviteLink
      }
    };
    try {
      const res = await this.mailerService.sendMail(mailOptions);
      if (!res.accepted) {
        this.logger.error("No accepted field in result");
        throw new Error();
      }
      this.logger.debug(res);
      return email;
    } catch (err) {
      this.logger.error("Cannot send email");
      throw new Error(email);
    }
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
