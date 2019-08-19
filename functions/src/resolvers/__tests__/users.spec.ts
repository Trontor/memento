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
import {
  AUTH_ERROR_MESSAGE,
  EMAIL_IN_USE_ERROR_MESSAGE,
  NOT_LOGGED_IN_ERROR_MESSAGE
} from "../users";
import { createContext } from "../../utils/context";
import { LOGIN, SIGNUP, UPDATE_USER } from "./mutations";
import { Gender, FamilyRole } from "../../generated/graphql";

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
  describe("login resolver", () => {
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

  describe("signup resolver", () => {
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

describe("updateUser resolver", () => {
  let mockUserModelInstance: jest.Mocked<UserModel>;
  let mockFamilyModelInstance: jest.Mocked<FamilyModel>;
  beforeEach(() => {
    mockUserModelInstance = new UserModel({
      db,
      clientAuth
    }) as jest.Mocked<UserModel>;

    mockFamilyModelInstance = new FamilyModel({ db }) as jest.Mocked<
      FamilyModel
    >;
  });

  describe("updating own fields", () => {
    it("should throw AuthenticationError if updater is not authenticated", async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: createContext(
          { user: mockUserModelInstance, family: mockFamilyModelInstance },
          adminAuth,
          db
        )
      });
      const { mutate } = createTestClient(testServer);
      const res = await mutate({
        mutation: UPDATE_USER,
        variables: {
          input: {
            userId: "WZNq3rP4AYUXBdYnQqozyuaUXPf2",
            location: "Melbourne, AU",
            gender: Gender.Male,
            role: {
              familyId: "456facd5-6f55-4f63-a46c-3ab7dbf54dbe",
              role: FamilyRole.Normal
            }
          }
        }
      });
      console.log(res);
      expect(res.errors).toContainEqual(
        new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE)
      );
      expect(res.data).toBeNull();
    });

    it("should successfully return updated data if authenticated", async () => {
      const updaterId = "WZNq3rP4AYUXBdYnQqozyuaUXPf2";
      const updaterFamilyId = "456facd5-6f55-4f63-a46c-3ab7dbf54dbe";

      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
          models: {
            user: mockUserModelInstance,
            family: mockFamilyModelInstance
          },
          adminAuth,
          db,
          user: {
            uid: updaterId // shortcut for 'authenticating' the user
          }
        }
      });

      const { mutate } = createTestClient(testServer);

      const data = {
        mutation: UPDATE_USER,
        variables: {
          input: {
            userId: updaterId, // updatee is the same as the updater
            location: "Melbourne, AU",
            gender: Gender.Male,
            role: {
              familyId: updaterFamilyId,
              role: FamilyRole.Normal
            }
          }
        }
      };

      const res = await mutate(data);

      expect(mockUserModelInstance.updateUser).toBeCalled();
      console.log(res);
      expect(res.errors).toBeUndefined();
      expect(res.data).toMatchObject({
        updateUser: {
          userId: updaterId,
          location: "Melbourne, AU",
          gender: Gender.Male,
          role: null // a user cannot their update own role
        }
      });
    });
  });
  describe("updating another user's fields", () => {});
});
