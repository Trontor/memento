import { signup, login, getUser } from "./users";
import { createFamily, getFamily } from "./family";
import {
  UserSignupInput,
  UserLoginInput,
  CreateFamilyInput,
  User
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
    me: () => "me",
    user: (_: any, { id }: { id: string }, context: Context) =>
      getUser(id, context)
  },
  User: {
    families: ({ roles }: User, _: any, context: Context) => {
      if (!roles) return null;
      const promises = roles.map(({ familyId }) => {
        console.log("fetching " + familyId);
        return getFamily(familyId, context);
      });
      return Promise.all(promises);
    }
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
