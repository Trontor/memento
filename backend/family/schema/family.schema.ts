import { Schema, model, Model, Document } from "mongoose";
import { Family } from "../dto/family.dto";

export interface FamilyDocument extends Family, Document {}

export interface IFamilyModel extends Model<FamilyDocument> {}

/**
 * The actual structure of the MongoDB collection.
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
    members: {
      type: [Array],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const FamilyModel: IFamilyModel = model<FamilyDocument, IFamilyModel>(
  "Family",
  FamilySchema
);
