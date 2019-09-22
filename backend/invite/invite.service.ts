import { Injectable, Logger, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InviteDocument } from "./schema/invite.schema";
import { Model } from "mongoose";
import uuidv4 from "uuid/v4";
import { mapDocumentToInviteDTO } from "./schema/invite.mapper";
import { Invite, FailedInviteOutput } from "./dto/invite.dto";
import {
  InviteNotFoundException,
  InviteExpiredException,
} from "./invite.exception";
import { isValidInvite } from "./invite.util";
import { User } from "../user/dto/user.dto";
import { MailerService, ISendMailOptions } from "@nest-modules/mailer";
import { ConfigService } from "../config/config.service";
import { FamilyService } from "../family/family.service";
import Joi from "@hapi/joi";
import { Family } from "../family/dto/family.dto";

/**
 * Manages CRUD for invites.
 */
@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);
  constructor(
    @InjectModel("Invite") private readonly InviteModel: Model<InviteDocument>,
    @Inject(forwardRef(() => FamilyService))
    private readonly familyService: FamilyService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Fetches invite from the database.
   *
   * @param inviteId id of invite
   */
  async getInvite(inviteId: string): Promise<Invite> {
    const invite = await this.InviteModel.findById(inviteId);
    if (!invite) throw new InviteNotFoundException();
    if (!isValidInvite(invite)) throw new InviteExpiredException();
    return mapDocumentToInviteDTO(invite);
  }

  /**
   * Creates a new invite in the database.
   *
   * @param inviter user inviting new members
   * @param familyId id of family that `inviter` belongs to
   */
  async createInvite(inviter: User, familyId: string): Promise<Invite> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24);
    this.logger.log(`${now} => ${tomorrow}`);
    let invite: InviteDocument = new this.InviteModel({
      _id: uuidv4(),
      inviterId: inviter.userId,
      familyId: familyId,
      createdAt: now,
      expiresAt: tomorrow,
    });
    invite = await invite.save();
    this.logger.debug(invite);
    return mapDocumentToInviteDTO(invite);
  }

  /**
   * Sends invite emails to new members to join a family.
   *
   * @param inviter user inviting the new members
   * @param familyId id of family that is inviting new members
   * @param emails emails of new members to be invited
   */
  async sendInvitesByEmail(inviter: User, familyId: string, emails: string[]) {
    const family = await this.familyService.getFamily(familyId);
    const invite = await this.createInvite(inviter, familyId);

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
          email,
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

    // await promises in parallel for efficiency
    await Promise.all(promises);
    return { sent, failed };
  }

  /**
   * Returns a promise that sends an invite by email.
   *
   * @param inviter user inviting the new members
   * @param invite the newly created invite
   * @param family the family that members users will be invited to
   * @param email email of the new member being invited
   */
  private async sendInviteByEmailPromise(
    inviter: User,
    invite: Invite,
    family: Family,
    email: string,
  ) {
    // validate email syntax
    const validatedEmail: Joi.ValidationResult<string> = Joi.validate(
      email,
      Joi.string().email({ minDomainSegments: 2 }),
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
        inviteLink,
      },
    };
    try {
      const res = await this.mailerService.sendMail(mailOptions);
      if (!res.accepted) {
        this.logger.error("No accepted field in result");
        throw new Error();
      }
      this.logger.debug(res);
      this.logger.log(JSON.stringify(res));
      return email;
    } catch (err) {
      this.logger.error(err);
      throw new Error(email);
    }
  }
}
