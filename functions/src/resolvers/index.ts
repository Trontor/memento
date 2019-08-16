import { signup } from "./users";
import { UserSignupInput } from "../generated/graphql";
import { Context } from "../utils/context";

interface WithUserSignupInput {
  input: UserSignupInput;
}

const resolvers = {
  Query: {
    me: () => "me"
  },
  Mutation: {
    signup: (_: any, { input }: WithUserSignupInput, context: Context) =>
      signup(input, context)
  }
};

export default resolvers;
