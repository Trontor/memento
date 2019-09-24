import { Schema, Model, model, Types, Document } from "mongoose";
import { Memento } from "../dto/memento.dto";
import { MediaType } from "../dto/media.dto";
import { FamilyDocument } from "../../family/schema/family.schema";
import { UserDocument } from "../../user/schema/user.schema";

/**
 * Use GraphQL `Memento` type as a single source of truth by extending the Mongoose
 * `MementoDocument` from the `Memento` class.
 * Issue: This can lead to messy bloated `MementoDocument`.
 */
export interface MementoDocument extends Memento, Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  inFamily: Types.ObjectId | FamilyDocument;
  uploadedBy: Types.ObjectId | UserDocument;
}

export interface IMementoModel extends Model<MementoDocument> {}

const MediaSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: [MediaType.Image, MediaType.Video],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const DateSchema: Schema = new Schema(
  {
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  {
    _id: false,
  },
);

/**
 * The actual structure of the Memento collection.
 */
export const MementoSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    inFamily: {
      // family which memento belongs to
      type: Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
    uploadedBy: {
      // uploader's userId
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    media: {
      type: [MediaSchema],
      default: [],
    },
    dates: {
      type: [DateSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const MementoModel: IMementoModel = model<
  MementoDocument,
  IMementoModel
>("Memento", MementoSchema);
