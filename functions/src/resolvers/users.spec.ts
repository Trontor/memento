// @ts-nocheck
import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import typeDefs from "../schema.graphql";
import resolvers from "../resolvers";
import { db, auth } from "../utils/firebase/admin";
import UserModel from "../models/User";

jest.mock("../models/User");

const SIGNUP = gql`
  mutation($input: UserSignupInput!) {
    signup(input: $input) {
      token
      user {
        email
        firstName
        lastName
        id
      }
    }
  }
`;

describe("users", () => {
  describe("signup", () => {
    let mockUserModelInstance: any, mutate: any;
    beforeEach(() => {
      mockUserModelInstance = new UserModel({ db, auth });

      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
          models: {
            user: mockUserModelInstance
          },
          auth: auth
        }
      });

      const ret = createTestClient(testServer);
      mutate = ret.mutate;
    });

    it("should create new user", async () => {
      const correctInput = {
        email: "mail@email.com",
        password: "123456",
        confirmPassword: "123456",
        firstName: "Joe",
        lastName: "Blogs"
      };
      (mockUserModelInstance.doesUserExist as jest.Mock).mockReturnValueOnce(
        false
      );
      (mockUserModelInstance.createUser as jest.Mock).mockReturnValueOnce({
        token: "some token",
        user: expect.anything()
      });
      await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(mockUserModelInstance.doesUserExist).toBeCalled();
      expect(mockUserModelInstance.createUser).toBeCalled();
    });

    it("should not create duplicate user", async () => {
      const correctInput = {
        email: "test2@email.com",
        password: "123456",
        confirmPassword: "123456",
        firstName: "Joe",
        lastName: "Blogs"
      };
      (mockUserModelInstance.doesUserExist as jest.Mock).mockReturnValueOnce(
        true
      );

      await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(mockUserModelInstance.createUser).not.toBeCalled();
    });

    it("should fail on empty email", async () => {
      const res = await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            email: "",
            password: "123456",
            confirmPassword: "123456",
            firstName: "Joe",
            lastName: "Blogs"
          }
        }
      });
      expect(res).toMatchObject({
        errors: expect.arrayContaining([expect.anything()])
      });
    });
  });
});
