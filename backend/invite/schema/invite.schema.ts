import { Schema, Document, Model, model } from "mongoose";
import { Invite } from "../dto/invite.dto";

export interface InviteDocument extends Invite, Document {}

export const InviteSchema: Schema = new Schema({
  familyId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

export interface IInviteModel extends Model<InviteDocument> {}

export const InviteModel: IInviteModel = model<InviteDocument, IInviteModel>(
  "Invite",
  InviteSchema
);
