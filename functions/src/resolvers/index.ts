import { signup } from "./users";
import { UserSignupInput } from "../generated/graphql";
import { Context } from "../";

interface WithUserSignupInput {
  input: UserSignupInput;
}

export const resolvers = {
  Query: {
    me: () => "me"
  },
  Mutation: {
    signup: (_: any, { input }: WithUserSignupInput, context: Context) =>
      signup(input, context)
  }
};
