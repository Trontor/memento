import { Schema, Model, model, Types, Document } from "mongoose";
import { Memento } from "../dto/memento.dto";
import { MediaType } from "../dto/media.dto";

/**
 * Use GraphQL `Memento` type as a single source of truth by extending the Mongoose
 * `MementoDocument` from the `Memento` class.
 */
export interface MementoDocument extends Memento, Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  inFamily: Types.ObjectId;
  uploadedBy: Types.ObjectId;

  /**
   * Converts `MementoDocument` to `Memento` DTO
   */
  toDTO(): Memento;
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

/**
 * Maps Mongoose `MementoDocument` to GraphQL `Memento` type.
 */
MementoSchema.methods.toDTO = function(): Memento {
  return {
    // mongodb id
    mementoId: this.id,
    location: this.location,
    type: this.type,
    dates: this.dates,
    // dummy: resolved if requested
    family: this.family,
    // dummy: resolved if requested
    uploader: this.uploader,
    media: this.media,
    description: this.description,
    // timestamps
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const MementoModel: IMementoModel = model<
  MementoDocument,
  IMementoModel
>("Memento", MementoSchema);
