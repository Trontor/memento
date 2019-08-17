import { CreateFamilyInput, Family } from "../generated/graphql";
import { Context } from "../utils/context";
import { AuthenticationError, ApolloError } from "apollo-server-express";
import { AUTH_ERROR_MESSAGE } from "./users";
import { db } from "../utils/firebase/admin";
import uuidv4 from "uuid/v4";
import { FamilyDocument } from "../models/Family";

// creates a new family
export const createFamily = async (
  input: CreateFamilyInput,
  context: Context
): Promise<Family> => {
  if (!context.user) {
    throw new AuthenticationError(AUTH_ERROR_MESSAGE);
  }

  const familyId = uuidv4();

  // const userDoc = await context.models.user.getUser(context.user.uid);

  const batch = db.batch();
  context.models.user.batchUpdateUser(batch, context.user.uid, {
    [`families.${familyId}`]: "admin"
  });

  const newFamilyDoc: FamilyDocument = context.models.family.batchCreateFamily(
    batch,
    context.user.uid,
    familyId,
    input
  );

  try {
    await batch.commit();
    console.log(newFamilyDoc);
    return {
      id: familyId,
      name: newFamilyDoc.name,
      description: newFamilyDoc.description,
      imageUrl: newFamilyDoc.imageUrl,
      numMembers: newFamilyDoc.numMembers,
      numArtifacts: newFamilyDoc.numArtifacts,
      createdAt: newFamilyDoc.createdAt
    };
  } catch (err) {
    console.error(err);
    throw new ApolloError("Could not create family");
  }
};
