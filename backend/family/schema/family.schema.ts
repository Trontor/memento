import { Schema, model, Document } from "mongoose";
import { Family } from "../dto/family.dto";

// Name of family collection
export const FAMILY_COLLECTION = "Family";

/**
 * Defines a `FamilyDocument` using `Family` DTO and Mongoose `Document`
 * to allow single source of truth for model's fields.
 */
export interface FamilyDocument extends Family, Document {
  // fields that are only found in the database Document
  memberIds: string[];
  // collection name of Amazon Rekognition collection for faces
  collectionArn: string;

  /**
   * Converts `FamilyDocument` to `Family` DTO
   */
  toDTO(): Family;
}

/**
 * The actual structure of the Family collection.
 */
export const FamilySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    memberIds: {
      type: [String],
      default: [],
    },
    colour: {
      type: String,
    },
    collectionArn: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Maps Mongoose `FamilyDocument` to GraphQL `Family` type.
 */
FamilySchema.methods.toDTO = function(): Family {
  return {
    // mongodb id
    familyId: this.id,
    // user details
    name: this.name,
    imageUrl: this.imageUrl,
    description: this.description,
    colour: this.colour,
    // family roles - resolver will set this
    members: [],
    // timestamps
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// export a Mongoose `Model` based on `FamilyDocument` defined above
export const FamilyModel = model<FamilyDocument>("Family", FamilySchema);

/**
 * Interface for the data to update family
 */
export interface IUpdateFamilyData {
  name?: string;
  imageUrl?: string;
  description?: string;
  colour?: string;
}
