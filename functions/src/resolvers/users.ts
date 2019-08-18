import {
  UserSignupInput,
  UserLoginInput,
  User,
  Role,
  FamilyRole,
  Gender,
  UpdateUserInput,
  UpdateUserOutput,
  AuthOutput
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
export const AUTHORIZATION_ERROR_MESSAGE: string = "Unauthorized";

export class AuthorizationError extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, "UNAUTHORIZED", properties);

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}

export interface UpdateableBySelf {
  imageUrl: string;
  location: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface UpdateableByOther {
  role: Role;
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
  if (userDoc === null) {
    throw new ApolloError(USER_NOT_FOUND_ERROR_MESSAGE);
  }
  // graphQl-ify roles from Object into array `[{familyId, role}]`
  const roles: Role[] = Object.entries(userDoc.roles).map(
    ([familyId, role]) => {
      return {
        familyId,
        role: role === FamilyRole.Admin ? FamilyRole.Admin : FamilyRole.Normal
      };
    }
  );

  // graphQl-ify gender property
  let gender = null;
  if (userDoc.gender) {
    gender = userDoc.gender == Gender.Male ? Gender.Male : Gender.Female;
  }

  return {
    id: userId,
    email: userDoc.email,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    imageUrl: userDoc.imageUrl,
    location: userDoc.location,
    dateOfBirth: userDoc.dateOfBirth,
    gender: gender,
    createdAt: userDoc.createdAt,
    lastLogin: userDoc.lastLogin,
    roles: roles
  };
};

export const updateUser = async (
  input: UpdateUserInput,
  ctx: Context
): Promise<UpdateUserOutput> => {
  if (!ctx.user) {
    throw new AuthenticationError("Not logged in");
  }
  const updater = ctx.user.uid; // user requesting the mutation
  const updatee = input.userId; // user being updated

  if (updater === updatee) {
    // a user can update his/her own fields
    const reducedInput: Partial<UpdateableBySelf> = {};
    if (input.location) reducedInput.location = input.location;
    if (input.gender) reducedInput.gender = input.gender;
    if (input.imageUrl) reducedInput.imageUrl = input.imageUrl;
    if (input.dateOfBirth) reducedInput.dateOfBirth = input.dateOfBirth;
    await ctx.models.user.updateUser(updatee, reducedInput);
    return { userId: updatee, ...reducedInput };
  } else {
    console.log("#############################");
    // A family admin can update another user's `role` ONLY
    // 1. updater is in same family as the `userId`
    // 2. updater is a family admin in the same family
    const reducedInput: Partial<UpdateableByOther> = {};
    if (input.role) {
      reducedInput.role = input.role;
    } else {
      throw new UserInputError(
        "No provided fields are updateable on another user."
      );
    }

    // check updater is an admin in input.role.familyId
    const updaterDoc = await ctx.models.user.getUser(updater);
    if (
      !updaterDoc ||
      !ctx.models.user.hasRoleInFamily(
        updaterDoc,
        FamilyRole.Admin,
        reducedInput.role.familyId
      )
    ) {
      throw new AuthorizationError("Updater not an admin");
    }

    // check user is in the same family
    const updateeDoc = await ctx.models.user.getUser(updatee);
    if (
      !updateeDoc ||
      !ctx.models.user.isInFamily(updateeDoc, reducedInput.role.familyId)
    ) {
      throw new AuthorizationError("Updatee not in same family as updater");
    }
    await ctx.models.user.updateUser(updatee, reducedInput);
    return {
      userId: updatee,
      ...reducedInput
    };
  }
};
