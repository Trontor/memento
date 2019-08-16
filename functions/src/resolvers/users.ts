import { UserSignupInput, AuthPayload } from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import { ValidationError, UserInputError } from "apollo-server-express";

import { Context } from "../utils/context";

export const signup = async (
  input: UserSignupInput,
  ctx: Context
): Promise<AuthPayload> => {
  // validate input
  const [errors, isValid] = validateUserSignupInput(input);
  if (!isValid) {
    throw new UserInputError("Signup arguments invalid", errors);
  }
  const userExists = await ctx.models.user.doesUserExist(input.email);
  if (userExists) {
    throw new ValidationError("Email already in use");
  }

  // create new user in auth and Firestore
  const { token, user } = await ctx.models.user.createUser(input);

  return {
    token,
    user
  };
};
