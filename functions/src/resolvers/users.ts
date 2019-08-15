import { UserSignupInput, AuthPayload, User } from "../generated/graphql";
import { validateUserSignupInput } from "../utils/validation";
import {
  ValidationError,
  ApolloError,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";

import { Context } from "..";

export const signup = async (
  input: UserSignupInput,
  ctx: Context
): Promise<AuthPayload> => {
  const [errors, isValid] = validateUserSignupInput(input);
  if (!isValid) {
    throw new UserInputError("Signup arguments invalid", errors);
  }
  try {
    const userSnapshot = await ctx.models.user.getUserByEmail(input.email);
    if (userSnapshot.exists) {
      throw new ValidationError("Email already in use");
    }

    const userCredential = await ctx.auth.createUserWithEmailAndPassword(
      input.email,
      input.password
    );

    const user = userCredential.user;
    let token: string;
    if (user === null) {
      throw new AuthenticationError("Could not signup");
    } else {
      token = await user.getIdToken();
    }
    const newUserDoc: User = {
      id: user.uid,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      createdAt: new Date().toISOString()
    };
    await ctx.models.user.createUser(newUserDoc);
    return {
      token: token,
      user: newUserDoc
    };
  } catch (err) {
    throw new ApolloError(err);
  }
};
