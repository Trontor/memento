import { Schema, model, Model, Document } from "mongoose";
import { Family } from "../dto/family.dto";

/**
 * Defines a `FamilyDocument` using `Family` DTO and Mongoose `Document`
 * to allow single source of truth for model's fields.
 */
export interface FamilyDocument extends Family, Document {
  // fields that are only found in the database Document
  memberIds: string[];
}

/**
 * More methods can be added here for future flexibility
 */
export interface IFamilyModel extends Model<FamilyDocument> {}

/**
 * The actual structure of the Family collection.
 */
export const FamilySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String
    },
    memberIds: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// export a Mongoose `Model` based on `FamilyDocument` defined above
export const FamilyModel: IFamilyModel = model<FamilyDocument, IFamilyModel>(
  "Family",
  FamilySchema
);
