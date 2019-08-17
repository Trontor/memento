import { signup, login } from "./users";
import { createFamily } from "./family";
import {
  UserSignupInput,
  UserLoginInput,
  CreateFamilyInput
} from "../generated/graphql";
import { Context } from "../utils/context";

interface WithUserSignupInput {
  input: UserSignupInput;
}

interface WithUserLoginInput {
  input: UserLoginInput;
}

interface WithCreateFamilyInput {
  input: CreateFamilyInput;
}

const resolvers = {
  Query: {
    me: () => "me"
  },
  Mutation: {
    signup: (_: any, { input }: WithUserSignupInput, context: Context) =>
      signup(input, context),
    login: (_: any, { input }: WithUserLoginInput, context: Context) =>
      login(input, context),
    createFamily: (
      _: any,
      { input }: WithCreateFamilyInput,
      context: Context
    ) => createFamily(input, context)
  }
};

export default resolvers;
