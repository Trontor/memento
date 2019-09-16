import { Schema, Document, Model, model } from "mongoose";
import { Invite } from "../dto/invite.dto";

/**
 * Defines an `InviteDocument` using `Invite` DTO and Mongoose `Document`
 * to allow single source of truth for model's fields.
 */
export interface InviteDocument extends Invite, Document {
  // fields that are only found in the database Document
}

/**
 * The actual structure of the Invite collection.
 */
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

/**
 * Prior to saving an Invite model to the database,
 * check if expiration time has been correctly set.
 */
InviteSchema.pre<InviteDocument>("save", function(next) {
  const invite = this;

  if (invite.createdAt.getTime() >= invite.expiresAt.getTime()) {
    return next(new Error("Invite expires before its create time"));
  }
  next();
});

/**
 * More methods can be added here for future flexibility
 */
export interface IInviteModel extends Model<InviteDocument> {}

// export a Mongoose `Model` based on `FamilyDocument` defined above
export const InviteModel: IInviteModel = model<InviteDocument, IInviteModel>(
  "Invite",
  InviteSchema
);
