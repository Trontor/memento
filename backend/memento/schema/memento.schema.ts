import { Schema, Model, model, Types, Document } from "mongoose";
import { Memento } from "../dto/memento.dto";
import { MediaType } from "../dto/media.dto";
import { Family } from "../../family/dto/family.dto";
import { User } from "../../user/dto/user.dto";

/**
 * Use GraphQL `Memento` type as a single source of truth by extending the Mongoose
 * `MementoDocument` from the `Memento` class.
 * Issue: This can lead to messy bloated `MementoDocument`.
 */
export interface MementoDocument extends Memento, Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  inFamily: Types.ObjectId | Family;
  uploadedBy: Types.ObjectId | User;
}

export interface IMementoModel extends Model<MementoDocument> {}

const MediaSchema: Schema = new Schema({
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
});

export const MediaModel = model("Media", MediaSchema);

const DateSchema: Schema = new Schema({
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
});

export const DateModel = model("Media", MediaSchema);

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
