import { signup, login, getUser, updateUser, updateRole } from "./users";
import { createFamily, getFamily } from "./family";
import {
  UserSignupInput,
  UserLoginInput,
  CreateFamilyInput,
  User,
  UpdateUserInput,
  UpdateRoleInput
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

interface WithUpdateUserInput {
  input: UpdateUserInput;
}

interface WithUpdateRoleInput {
  input: UpdateRoleInput;
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
    ) => createFamily(input, context),
    updateUser: (_: any, { input }: WithUpdateUserInput, context: Context) =>
      updateUser(input, context),
    updateRole: (_: any, { input }: WithUpdateRoleInput, context: Context) =>
      updateRole(input, context)
  }
};

export default resolvers;
