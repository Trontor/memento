import {
  CreateFamilyInput,
  Family,
  FamilyRole,
  CreateInvitationInput,
  Invitation
} from "../generated/graphql";
import { Context } from "../utils/context";
import { AuthenticationError, ApolloError } from "apollo-server-express";

import { db } from "../utils/firebase/admin";
import uuidv4 from "uuid/v4";
import { FamilyDocument } from "../models/Family";
import {
  NOT_LOGGED_IN_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  AuthorizationError,
  AUTHORIZATION_ERROR_MESSAGE
} from "../utils/errors";

export const getFamily = async (
  id: string,
  context: Context
): Promise<Family | null> => {
  const familyDoc = await context.models.family.getFamilyById(id);
  if (!familyDoc) return null;
  return {
    id,
    name: familyDoc.name,
    numArtifacts: familyDoc.numArtifacts,
    numMembers: familyDoc.numMembers,
    createdAt: familyDoc.createdAt,
    imageUrl: familyDoc.imageUrl,
    description: familyDoc.description
  };
};

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
    [`roles.${familyId}`]: FamilyRole.Admin
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

export const createInvitation = async (
  input: CreateInvitationInput,
  ctx: Context
): Promise<Invitation> => {
  if (!ctx.user) {
    throw new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE);
  }
  const { familyId } = input;
  try {
    const userDoc = await ctx.models.user.getUser(ctx.user.uid);
    if (!ctx.models.user.hasRoleInFamily(userDoc, FamilyRole.Admin, familyId)) {
      throw new AuthorizationError(AUTHORIZATION_ERROR_MESSAGE);
    }
    const invitation = await ctx.models.invitation.createInvitation(familyId);
    return { ...invitation };
  } catch (err) {
    throw err;
  }
};
