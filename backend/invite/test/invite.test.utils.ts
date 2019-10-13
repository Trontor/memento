import { InviteSchema, InviteDocument } from "../schema/invite.schema";
import { model, Types } from "mongoose";
import faker from "faker";

export interface IInviteModelInput {
  _id: string;
  inviterId: string;
  familyId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class MockInviteDocument implements IInviteModelInput {
  _id: string;
  inviterId: string;
  familyId: string;
  createdAt: Date;
  expiresAt: Date;

  constructor(args: IInviteModelInput) {
    this._id = args._id;
    this.inviterId = args.inviterId;
    this.familyId = args.familyId;
    this.createdAt = args.createdAt;
    this.expiresAt = args.expiresAt;
  }

  get id() {
    return this._id;
  }

  async save() {
    return this;
  }
}

const inviteModel = model<InviteDocument>("Invite", InviteSchema);

export const VALID_INVITE_DOC: InviteDocument = new inviteModel({
  _id: faker.random.uuid(),
  inviterId: Types.ObjectId().toHexString(),
  familyId: Types.ObjectId().toHexString(),
  createdAt: faker.date.past(),
  expiresAt: faker.date.future(),
});

export const EXPIRED_INVITE_DOC: InviteDocument = new inviteModel({
  _id: faker.random.uuid(),
  inviterId: Types.ObjectId().toHexString(),
  familyId: Types.ObjectId().toHexString(),
  createdAt: faker.date.past(),
  expiresAt: faker.date.past(), // already expired
});
