import {
  UserSignupInput,
  AuthPayload,
  UserLoginInput
} from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import { UserInputError, AuthenticationError } from "apollo-server-express";

import { Context } from "../utils/context";

export const AUTH_ERROR_MESSAGE: string = "Could not authenticate user";
export const EMAIL_IN_USE_ERROR_MESSAGE: string =
  "The email address is already in use by another account.";
export const INVALID_ARGS_ERROR_MESSAGE: string = "Invalid input arguments";

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
