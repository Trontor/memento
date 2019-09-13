import { UserDocument } from "./user.schema";
import { User } from "../dto/user.dto";

/**
 * Maps Mongoose `UserDocument` to GraphQL `User` type.
 */
export const mapDocumentToUserDTO = (doc: UserDocument): User => {
  return {
    // mongodb id
    userId: doc.id,
    // user details
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    gender: doc.gender,
    imageUrl: doc.imageUrl,
    dateOfBirth: doc.dateOfBirth,
    location: doc.location,
    // family roles
    familyRoles: doc.roles,
    // dummy array - resolver will deal with this
    families: [],
    // timestamps
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastSeenAt: doc.lastSeenAt
  };
};
