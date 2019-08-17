import { CreateFamilyInput } from "../generated/graphql";
import { Context } from "../utils/context";
import { AuthenticationError, ApolloError } from "apollo-server-express";
import { AUTH_ERROR_MESSAGE } from "./users";
import { db } from "../utils/firebase/admin";
import uuidv4 from "uuid/v4";

// creates a new family
export const createFamily = async (
  input: CreateFamilyInput,
  context: Context
) => {
  if (!context.user) {
    throw new AuthenticationError(AUTH_ERROR_MESSAGE);
  }

  // const userId = context.user.uid;
  const familyId = uuidv4();
  // const relationId = `${userId}_${familyId}`
  // db.

  const batch = db.batch();
  context.models.user.batchUpdateUser(batch, context.user.uid, {
    families: {
      [familyId]: "admin"
    }
  });

  context.models.family.batchCreateFamily(
    batch,
    context.user.uid,
    familyId,
    input
  );

  try {
    await batch.commit();
  } catch (err) {
    console.error(err);
    throw new ApolloError("Could not create family");
  }
};
