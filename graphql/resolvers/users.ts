import {
  UserSignupInput,
  UserLoginInput,
  User,
  FamilyRole,
  UpdateUserInput,
  AuthOutput,
  UpdateRoleInput,
  UpdateRoleOutput
} from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import {
  UserInputError,
  AuthenticationError,
  ApolloError
} from "apollo-server-express";

import { Context } from "../utils/context";
import { UserDocument } from "../models/User";

export const AUTH_ERROR_MESSAGE: string = "Could not authenticate user";
export const EMAIL_IN_USE_ERROR_MESSAGE: string =
  "The email address is already in use by another account.";
export const INVALID_ARGS_ERROR_MESSAGE: string = "Invalid input arguments";
export const USER_NOT_FOUND_ERROR_MESSAGE: string = "User not found";
export const AUTHORIZATION_ERROR_MESSAGE: string = "Unauthorized";
export const NOT_LOGGED_IN_ERROR_MESSAGE: string = "Not logged in";
export const MUST_BE_FAMILY_ADMIN_ERROR_MESSAGE: string =
  "Must be a family admin";
export const CANNOT_CHANGE_OWN_ROLE_ERROR_MESSAGE: string =
  "Cannot change own role";

export class AuthorizationError extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, "UNAUTHORIZED", properties);

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}

export const signup = async (
  input: UserSignupInput,
  ctx: Context
): Promise<AuthOutput> => {
  // validate input
  const [errors, isValid] = validateUserSignupInput(input);
  if (!isValid) {
    throw new UserInputError(INVALID_ARGS_ERROR_MESSAGE, errors);
  }
  // create new user `in auth and Firestore
  const { token, user } = await ctx.models.user.createUser(input);
  return {
    token,
    user
  };
};

export const login = async (
  input: UserLoginInput,
  ctx: Context
): Promise<AuthOutput> => {
  const result = await ctx.models.user.loginUser(input);
  if (!result || !result.token) {
    throw new AuthenticationError(AUTH_ERROR_MESSAGE);
  }
  return {
    token: result.token
  };
};

/**
 * Fetches a user from user model and returns GQL schema-compliant `User` type.
 * @param userId firebase user id
 * @param ctx apollo server context containing references to models and firebase libs
 */
export const getUser = async (userId: string, ctx: Context): Promise<User> => {
  const userDoc = await ctx.models.user.getUser(userId);
  return ctx.models.user.convertUserDocumentToUser(userDoc, userId);
};

/**
 * Selects the allowed fields to update a user.
 */
const reduceUpdateUserInput = ({
  location,
  gender,
  imageUrl,
  dateOfBirth
}: UpdateUserInput): Partial<UpdateUserInput> => {
  const reducedInput: Partial<UpdateUserInput> = {};
  if (location) reducedInput.location = location;
  if (gender) reducedInput.gender = gender;
  if (imageUrl) reducedInput.imageUrl = imageUrl;
  if (dateOfBirth) reducedInput.dateOfBirth = dateOfBirth;
  return reducedInput;
};

export const updateUser = async (
  input: UpdateUserInput,
  ctx: Context
): Promise<User> => {
  if (!ctx.user) {
    console.log(NOT_LOGGED_IN_ERROR_MESSAGE);
    throw new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE);
  }

  const updater = ctx.user.uid; // user requesting the mutation
  const updatee = input.id; // user being updated

  if (updater !== updatee) {
    throw new AuthorizationError(AUTHORIZATION_ERROR_MESSAGE);
  }
  const reducedInput: Partial<UpdateUserInput> = reduceUpdateUserInput(input);
  try {
    const updatedDoc: UserDocument = await ctx.models.user.updateUser(
      updatee,
      reducedInput
    );
    const updatedUser: User = ctx.models.user.convertUserDocumentToUser(
      updatedDoc,
      updatee
    );
    return updatedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const validatePermissionToUpdateRole = async (
  updaterId: string,
  updateeId: string,
  familyId: string,
  ctx: Context
) => {
  if (updaterId === updateeId) {
    throw new AuthorizationError(CANNOT_CHANGE_OWN_ROLE_ERROR_MESSAGE);
  }

  // check updater is an admin in input.role.familyId
  const updaterDoc = await ctx.models.user.getUser(updaterId);
  if (
    !updaterDoc ||
    !ctx.models.user.hasRoleInFamily(updaterDoc, FamilyRole.Admin, familyId)
  ) {
    throw new AuthorizationError(MUST_BE_FAMILY_ADMIN_ERROR_MESSAGE);
  }

  // check user is in the same family
  const updateeDoc = await ctx.models.user.getUser(updateeId);
  if (!updateeDoc || !ctx.models.user.isInFamily(updateeDoc, familyId)) {
    throw new AuthorizationError("Updatee not in same family as updater");
  }
};

/**
 * Updates the role of a user in a particular family.
 * @param input Update role input
 * @param ctx Apollo Server context object
 */
export const updateRole = async (
  { userId, role }: UpdateRoleInput,
  ctx: Context
): Promise<UpdateRoleOutput> => {
  if (!ctx.user) {
    throw new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE);
  }
  // user can only update role
  if (!role) {
    throw new UserInputError(
      "No provided fields are updateable on another user."
    );
  }

  const updater = ctx.user.uid; // user requesting the mutation
  const updatee = userId; // user being updated

  try {
    await validatePermissionToUpdateRole(updater, updatee, role.familyId, ctx);
  } catch (err) {
    console.log(err);
    throw err;
  }
  await ctx.models.user.updateRole(updatee, role);
  return { userId, role };
};
