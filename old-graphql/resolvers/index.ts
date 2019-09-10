import {
  signup,
  login,
  getUser,
  updateUser,
  updateRole,
  getAuthenticatedUser
} from "./users";
import {
  createFamily,
  getFamily,
  createInvitation,
  joinFamily
} from "./family";

import { Context } from "../utils/context";
import { User, Family } from "../generated/graphql";
import {
  WithUserSignupInput,
  WithUserLoginInput,
  WithCreateFamilyInput,
  WithUpdateUserInput,
  WithUpdateRoleInput,
  WithCreateInvitationInput,
  WithJoinFamilyInput
} from "./interfaces";

const resolvers = {
  Query: {
    me: () => "me",
    currentUser: (_: any, {}, context: Context) =>
      getAuthenticatedUser(context),
    user: (_: any, { id }: { id: string }, context: Context) =>
      getUser(id, context)
  },
  Family: {
    users: async ({ id }: Family, _: any, context: Context) => {
      console.log("nested family");
      const { users } = await context.models.family.getFamilyById(id);
      const promises = users.map(userId => {
        return getUser(userId, context);
      });
      return Promise.all(promises);
    }
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
      updateRole(input, context),
    createInvitation: (
      _: any,
      { input }: WithCreateInvitationInput,
      context: Context
    ) => createInvitation(input, context),
    joinFamily: (_: any, { input }: WithJoinFamilyInput, context: Context) =>
      joinFamily(input, context)
  }
};

export default resolvers;
