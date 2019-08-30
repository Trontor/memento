import UserModel from "../../models/User";
import FamilyModel from "../../models/Family";
import InvitationModel from "../../models/Invitation";
import { db, clientAuth } from "../firebase/admin";

import typeDefs from "../../schema.graphql";
import resolvers from "../../resolvers";
import { ApolloServer } from "apollo-server-express";
import { Models, Context } from "../context";

jest.mock("../../models/User");
jest.mock("../../models/Family");
jest.mock("../../models/Invitation");
jest.mock("../firebase/admin");

export const mockApolloServer = (user: any) => {
  const mockUserModelInstance = new UserModel({
    db,
    clientAuth
  }) as jest.Mocked<UserModel>;
  const mockFamilyModelInstance = new FamilyModel({ db }) as jest.Mocked<
    FamilyModel
  >;
  const mockInvitationModelInstance = new InvitationModel({
    db
  }) as jest.Mocked<InvitationModel>;

  const models: Models = {
    user: mockUserModelInstance,
    family: mockFamilyModelInstance,
    invitation: mockInvitationModelInstance
  };

  const mockContext: Context = {
    models,
    db,
    user
  };

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: mockContext
  });
  return { testServer, models };
};
