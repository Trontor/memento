import { Schema, Model, Types, Document } from "mongoose";
import { Memento, MementoDate } from "../dto/memento.dto";
import { MediaType, Media } from "../dto/media.dto";
import { DateSchema } from "@hapi/joi";

/**
 * Use GraphQL `Memento` type as a single source of truth by extending the Mongoose
 * `MementoDocument` from the `Memento` class.
 */
export interface MementoDocument extends Memento, Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  inFamily: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  _dates: any;
  _media: any;

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

export interface MediaDocument extends Media, Document {
  /**
   * Converts `MediaDocument` to `Media` DTO
   */
  toDTO(): Media;
}

/**
 * Converts `MediaDocument` to `Media` DTO
 */
MediaSchema.methods.toDTO = function(): Media {
  // include document id in DTO
  return {
    mediaId: this.id,
    type: this.type,
    url: this.url,
    caption: this.caption,
  };
};

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

export interface DateDocument extends MementoDate, Document {
  /**
   * Converts `DateDocument` to `MementoDate` DTO
   */
  toDTO(): MementoDate;
}

/**
 * Converts `DateDocument` to `MementoDate` DTO
 */
DateSchema.methods.toDTO = function(): MementoDate {
  // include document id in DTO
  return {
    dateId: this.id,
    day: this.day,
    month: this.month,
    year: this.year,
  };
};

/**
 * The actual structure of the Memento collection.
 */
export const MementoSchema: Schema<MementoDocument> = new Schema(
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
    _media: {
      type: [MediaSchema],
      default: [],
    },
    _dates: {
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
    dates: this._dates.map((date: any) => date.toDTO()),
    media: this._media.map((m: any) => m.toDTO()),
    // dummy: resolved if requested
    family: this.family,
    // dummy: resolved if requested
    uploader: this.uploader,
    description: this.description,
    tags: this.tags,
    // timestamps
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * Interface for filtering Mementos
 */
export interface IFindMementoConditions {
  _id?: {
    $gt: Types.ObjectId;
  };
  inFamily: Types.ObjectId;
  tags?: {
    $in: string[];
  };
}

export interface IUpdateMementoPayload {
  $pull?: {
    _media?: {
      _id: {
        $in: Types.ObjectId[];
      };
    };
  };
  $push?: {
    _media?: {
      $each: any[];
    };
  };
  $set: {
    [key: string]: any;
  };
}

export interface IUpdateMementoOptions {
  new?: boolean;
  arrayFilters?: any[];
}
