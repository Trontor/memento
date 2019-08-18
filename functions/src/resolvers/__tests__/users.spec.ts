import {
  ApolloServer,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import typeDefs from "../../schema.graphql";
import resolvers from "..";
import { db, clientAuth, adminAuth } from "../../utils/firebase/admin";
import UserModel from "../../models/User";
import FamilyModel from "../../models/Family";
import { AUTH_ERROR_MESSAGE, EMAIL_IN_USE_ERROR_MESSAGE } from "../users";
import { createContext } from "../../utils/context";
import { LOGIN, SIGNUP } from "./mutations";

jest.mock("../../models/User");
jest.mock("../../models/Family");

describe("integration tests - user resolver", () => {
  let mockUserModelInstance: jest.Mocked<UserModel>,
    mockFamilyModelInstance: jest.Mocked<FamilyModel>,
    testServer: ApolloServer;
  beforeEach(() => {
    mockUserModelInstance = new UserModel({ db, clientAuth }) as any;
    mockFamilyModelInstance = new FamilyModel({ db }) as any;

    testServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: createContext(
        { user: mockUserModelInstance, family: mockFamilyModelInstance },
        adminAuth,
        db
      )
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
 
      mockUserModelInstance.loginUser.mockResolvedValue({ 
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
      mockUserModelInstance.loginUser.mockResolvedValue(null);
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
      mockUserModelInstance.createUser.mockResolvedValue({ 
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
      mockUserModelInstance.createUser.mockImplementation(() => {
        throw new UserInputError(EMAIL_IN_USE_ERROR_MESSAGE);
      });
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
