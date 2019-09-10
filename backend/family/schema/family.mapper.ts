import { FamilyDocument } from "./family.schema";
import { Family } from "../dto/family.dto";

/**
 * Maps Mongoose `FamilyDocument` to GraphQL `Family` type.
 */
export const mapDocumentToFamilyDTO = (doc: FamilyDocument): Family => {
  return {
    // mongodb id
    familyId: doc.id,
    // user details
    name: doc.name,
    imageUrl: doc.imageUrl,
    description: doc.description,
    // family roles - resolver will set this
    members: undefined,
    // timestamps
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
};
