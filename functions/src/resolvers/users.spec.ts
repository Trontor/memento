import {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import typeDefs from "../schema.graphql";
import resolvers from "./";
import { db, auth } from "../utils/firebase/admin";
import UserModel from "../models/User";
import { AUTH_ERROR_MESSAGE, EMAIL_IN_USE_ERROR_MESSAGE } from "./users";

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

const LOGIN = gql`
  mutation($input: UserLoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

describe("integration tests - users", () => {
  let mockUserModelInstance: any, testServer: ApolloServer;
  beforeEach(() => {
    mockUserModelInstance = new UserModel({ db, auth });

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        models: {
          user: mockUserModelInstance
        }
      }
    });
  });
  describe("login", () => {
    it("should return token for existing user", async () => {
      const { mutate } = createTestClient(testServer);
      const DUMMY_INPUT = {
        email: "mail@email.com",
        password: "correctPassword"
      };
      const TOKEN: string = "valid token";
      mockUserModelInstance.loginUser.mockReturnValueOnce({
        token: TOKEN
      });

      const res = await mutate({
        mutation: LOGIN,
        variables: {
          input: {
            ...DUMMY_INPUT
          }
        }
      });
      expect(res.errors).toBeUndefined();
      expect(res.data !== undefined && res.data.login.token === TOKEN);
    });

    it(`should return '${AUTH_ERROR_MESSAGE}'`, async () => {
      const { mutate } = createTestClient(testServer);
      expect.assertions(1);
      const correctInput = {
        email: "mail@email.com",
        password: "correctPassword"
      };
      mockUserModelInstance.loginUser.mockReturnValueOnce(null);
      const res = await mutate({
        mutation: LOGIN,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(res.errors).toContainEqual(
        new AuthenticationError(AUTH_ERROR_MESSAGE)
      );
    });
  });

  describe("signup", () => {
    it("should create new user", async () => {
      const { mutate } = createTestClient(testServer);
      const correctInput = {
        email: "mail@email.com",
        password: "123456",
        confirmPassword: "123456",
        firstName: "Joe",
        lastName: "Blogs"
      };
      mockUserModelInstance.doesUserExist.mockReturnValueOnce(false);
      mockUserModelInstance.createUser.mockReturnValueOnce({
        token: "some token",
        user: expect.anything()
      });
      const res = await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(mockUserModelInstance.createUser).toBeCalled();
      expect(res.data).toMatchObject({ signup: { token: "some token" } });
    });

    it("should not create duplicate user", async () => {
      const { mutate } = createTestClient(testServer);
      const correctInput = {
        email: "duplicate@email.com",
        password: "123456",
        confirmPassword: "123456",
        firstName: "Joe",
        lastName: "Blogs"
      };
      mockUserModelInstance.doesUserExist.mockReturnValueOnce(true);

      const res = await mutate({
        mutation: SIGNUP,
        variables: {
          input: {
            ...correctInput
          }
        }
      });
      expect(mockUserModelInstance.createUser).not.toBeCalled();
      expect(res.errors).toContainEqual(
        new UserInputError(EMAIL_IN_USE_ERROR_MESSAGE)
      );
    });

    it("should fail on empty email", async () => {
      const { mutate } = createTestClient(testServer);
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
