import { signup, login } from "./users";
import { UserSignupInput, UserLoginInput } from "../generated/graphql";
import { Context } from "../utils/context";

interface WithUserSignupInput {
  input: UserSignupInput;
}

interface WithUserLoginInput {
  input: UserLoginInput;
}

const resolvers = {
  Query: {
    me: () => "me"
  },
  Mutation: {
    signup: (_: any, { input }: WithUserSignupInput, context: Context) =>
      signup(input, context),
    login: (_: any, { input }: WithUserLoginInput, context: Context) =>
      login(input, context)
  }
};

export default resolvers;
