import { Schema, Document, Model, model } from "mongoose";
import { Invite } from "../dto/invite.dto";

export interface InviteDocument extends Invite, Document {}

export const InviteSchema: Schema = new Schema({
  _id: {
    type: String
  },
  inviterId: {
    type: String,
    required: true
  },
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

InviteSchema.pre<InviteDocument>("save", function(next) {
  const invite = this;

  if (invite.createdAt.getTime() >= invite.expiresAt.getTime()) {
    return next(new Error("Invite expires before its create time"));
  }
  next();
});

export interface IInviteModel extends Model<InviteDocument> {}

export const InviteModel: IInviteModel = model<InviteDocument, IInviteModel>(
  "Invite",
  InviteSchema
);
