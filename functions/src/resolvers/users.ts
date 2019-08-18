import {
  UserSignupInput,
  AuthPayload,
  UserLoginInput,
  User,
  Role,
  FamilyRole
} from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import {
  UserInputError,
  AuthenticationError,
  ApolloError
} from "apollo-server-express";

import { Context } from "../utils/context";

export const AUTH_ERROR_MESSAGE: string = "Could not authenticate user";
export const EMAIL_IN_USE_ERROR_MESSAGE: string =
  "The email address is already in use by another account.";
export const INVALID_ARGS_ERROR_MESSAGE: string = "Invalid input arguments";
export const USER_NOT_FOUND_ERROR_MESSAGE: string = "User not found";

export const signup = async (
  input: UserSignupInput,
  ctx: Context
): Promise<AuthPayload> => {
  // validate input
  const [errors, isValid] = validateUserSignupInput(input);
  if (!isValid) {
    throw new UserInputError(INVALID_ARGS_ERROR_MESSAGE, errors);
  }

  // create new user in auth and Firestore
  const { token, user } = await ctx.models.user.createUser(input);

  return {
    token,
    user
  };
};

export const login = async (
  input: UserLoginInput,
  ctx: Context
): Promise<AuthPayload> => {
  const result = await ctx.models.user.loginUser(input);
  if (!result || !result.token) {
    throw new AuthenticationError(AUTH_ERROR_MESSAGE);
  }
  return {
    token: result.token
  };
};

export const getUser = async (userId: string, ctx: Context): Promise<User> => {
  const userDoc = await ctx.models.user.getUser(userId);
  if (userDoc === null) {
    throw new ApolloError(USER_NOT_FOUND_ERROR_MESSAGE);
  }
  // transform roles into [{familyId, role}]
  const roles: Role[] = Object.entries(userDoc.roles).map(
    ([familyId, role]) => {
      return {
        familyId,
        role: role === FamilyRole.Admin ? FamilyRole.Admin : FamilyRole.Normal
      };
    }
  );

  return {
    id: userId,
    email: userDoc.email,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    imageUrl: userDoc.imageUrl,
    location: userDoc.location,
    dateOfBirth: userDoc.dateOfBirth,
    gender: userDoc.gender,
    createdAt: userDoc.createdAt,
    lastLogin: userDoc.lastLogin,
    roles: roles
  };
};
