import functions from "firebase-functions-test";
import path from "path";
import dotenv from "dotenv";
import { ApolloServer, UserInputError } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import typeDefs from "../../schema.graphql";
import resolvers from "..";
import { db, clientAuth, adminAuth } from "../../utils/firebase/admin";
import UserModel from "../../models/User";
import { createContext } from "../../utils/context";
import { SIGNUP } from "./mutations";
import { EMAIL_IN_USE_ERROR_MESSAGE } from "../users";
import FamilyModel from "../../models/Family";

dotenv.config();

functions(
  {
    projectId: process.env.projectId,
    databaseURL: process.env.databaseURL
  },
  path.resolve("./service-account.json")
);

describe("e2e tests - users", () => {
  let testServer: ApolloServer;
  beforeAll(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: createContext(
        {
          user: new UserModel({ db, clientAuth }),
          family: new FamilyModel({ db })
        },
        adminAuth,
        db
      )
    });
  });
  describe("signup", () => {
    it(`should fail as '${EMAIL_IN_USE_ERROR_MESSAGE}'`, async () => {
      const { mutate } = createTestClient(testServer);
      const correctInput = {
        email: "test@test.com",
        password: "123456",
        confirmPassword: "123456",
        firstName: "test",
        lastName: "test"
      };
      const res = await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(res.errors).toContainEqual(
        new UserInputError(EMAIL_IN_USE_ERROR_MESSAGE)
      );
    });
  });
});
