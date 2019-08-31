import {
  ApolloServer,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import UserModel, { UserDocument } from "../../models/User";

import { LOGIN, SIGNUP, UPDATE_USER, UPDATE_ROLE } from "./mutations";
import {
  Gender,
  UpdateRoleInput,
  FamilyRole,
  UpdateRoleOutput
} from "../../generated/graphql";
import {
  AUTH_ERROR_MESSAGE,
  EMAIL_IN_USE_ERROR_MESSAGE,
  NOT_LOGGED_IN_ERROR_MESSAGE,
  AuthorizationError,
  MUST_BE_FAMILY_ADMIN_ERROR_MESSAGE
} from "../../utils/errors";
import { mockApolloServer } from "../../utils/tests/server";

describe("integration tests - user resolver", () => {
  let mockUserModelInstance: jest.Mocked<UserModel>, testServer: ApolloServer;
  beforeEach(() => {
    const mockServer = mockApolloServer(null);
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;
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
        userId: "some id",
        userDoc: expect.anything()
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
  let testServer: ApolloServer;
  let mockUserModelClass: typeof UserModel;

  beforeEach(() => {
    const mockServer = mockApolloServer(null);
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;
    mockUserModelClass = mockServer.models.user.class;
  });

  it("should throw AuthenticationError if updater is not authenticated", async () => {
    const { mutate } = createTestClient(testServer);
    const res = await mutate({
      mutation: UPDATE_USER,
      variables: {
        input: {
          id: "WZNq3rP4AYUXBdYnQqozyuaUXPf2",
          location: "Melbourne, AU",
          gender: Gender.Male
        }
      }
    });
    expect(res.errors).toContainEqual(
      new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE)
    );
  });

  it("should successfully return updated data if authenticated", async () => {
    const UPDATER_ID = "WZNq3rP4AYUXBdYnQqozyuaUXPf2";
    const LOCATION = "Melbourne, AU";
    const GENDER = Gender.Male;
    const DUMMY_STRING = "dummy";

    const mockServer = mockApolloServer({ uid: UPDATER_ID });
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;

    const { mutate } = createTestClient(testServer);

    const data = {
      mutation: UPDATE_USER,
      variables: {
        input: {
          id: UPDATER_ID, // updatee is the same as the updater
          location: LOCATION,
          gender: GENDER
        }
      }
    };

    mockUserModelInstance.updateUser.mockResolvedValue(expect.anything());

    const mockedFromUserDocument = jest.fn();

    mockUserModelClass.fromUserDocument = mockedFromUserDocument;

    mockedFromUserDocument.mockReturnValue({
      id: UPDATER_ID,
      email: DUMMY_STRING,
      firstName: DUMMY_STRING,
      lastName: DUMMY_STRING,
      createdAt: DUMMY_STRING,
      location: LOCATION,
      gender: GENDER
    });

    const res = await mutate(data);
    expect(mockUserModelInstance.updateUser).toBeCalled();
    expect(mockedFromUserDocument).toBeCalled();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchObject({
      updateUser: {
        id: UPDATER_ID,
        location: LOCATION,
        gender: GENDER
      }
    });
  });
});

describe("updateRole resolver", () => {
  let mockUserModelInstance: jest.Mocked<UserModel>;
  let testServer: ApolloServer;
  beforeEach(() => {
    const mockServer = mockApolloServer(null);
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;
  });

  it("should throw AuthenticationError if updater is not authenticated", async () => {
    const { mutate } = createTestClient(testServer);
    const input: UpdateRoleInput = {
      userId: "WZNq3rP4AYUXBdYnQqozyuaUXPf2",
      role: {
        familyId: "aasbd123-asdnad-123132-asdas",
        role: FamilyRole.Admin
      }
    };

    const res = await mutate({
      mutation: UPDATE_ROLE,
      variables: {
        input
      }
    });
    expect(res.errors).toContainEqual(
      new AuthenticationError(NOT_LOGGED_IN_ERROR_MESSAGE)
    );
  });

  it("should throw AuthorizationError if not admin of the updatee's family", async () => {
    const UPDATEE = {
      USER_ID: "WZNq3rP4AYUXBdYnQqozyuaUXPf2",
      FAMILY_ID: "aasbd123-asdnad-123132-asdas",
      ROLE: FamilyRole.Normal
    };

    // Updater is NOT an admin in the same family group as updatee
    const UPDATER = {
      USER_ID: "UzxasdaKJHKJGDssNHK123JLKss3",
      FAMILY_ID: UPDATEE.FAMILY_ID,
      ROLE: FamilyRole.Normal // here
    };

    expect(UPDATEE.USER_ID).not.toStrictEqual(UPDATER.USER_ID);
    expect(UPDATEE.FAMILY_ID).toStrictEqual(UPDATER.FAMILY_ID);

    const DUMMY_STRING = "dummy";

    // updater's user document containing family and role information
    const updaterDoc: UserDocument = {
      email: DUMMY_STRING,
      firstName: DUMMY_STRING,
      lastName: DUMMY_STRING,
      createdAt: DUMMY_STRING,
      roles: {
        familyId: UPDATER.FAMILY_ID,
        role: UPDATER.ROLE
      }
    };

    const mockServer = mockApolloServer({
      uid: UPDATER.USER_ID
    });
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;

    const { mutate } = createTestClient(testServer);
    const input: UpdateRoleInput = {
      userId: UPDATEE.USER_ID,
      role: {
        familyId: UPDATEE.FAMILY_ID,
        role: UPDATEE.ROLE
      }
    };

    mockUserModelInstance.getUser.mockResolvedValue(updaterDoc);

    const res = await mutate({
      mutation: UPDATE_ROLE,
      variables: {
        input
      }
    });

    expect(res.errors).toContainEqual(
      new AuthorizationError(MUST_BE_FAMILY_ADMIN_ERROR_MESSAGE)
    );
  });

  it("should successfully update another user if updater is family admin", async () => {
    const UPDATEE = {
      USER_ID: "WZNq3rP4AYUXBdYnQqozyuaUXPf2",
      FAMILY_ID: "aasbd123-asdnad-123132-asdas",
      ROLE: FamilyRole.Normal,
      NEW_ROLE: FamilyRole.Admin
    };

    // Updater is an admin in the same family group as updatee
    const UPDATER = {
      USER_ID: "UzxasdaKJHKJGDssNHK123JLKss3",
      FAMILY_ID: UPDATEE.FAMILY_ID,
      ROLE: FamilyRole.Admin
    };

    expect(UPDATEE.USER_ID).not.toStrictEqual(UPDATER.USER_ID);
    expect(UPDATEE.FAMILY_ID).toStrictEqual(UPDATER.FAMILY_ID);

    const DUMMY_STRING = "dummy";

    // updater's user document containing family and role information
    const updaterDoc: UserDocument = {
      email: DUMMY_STRING,
      firstName: DUMMY_STRING,
      lastName: DUMMY_STRING,
      createdAt: DUMMY_STRING,
      roles: {
        familyId: UPDATER.FAMILY_ID,
        role: UPDATER.ROLE
      }
    };

    // updatee's user document indicates same family as updater
    const updateeDoc: UserDocument = {
      email: DUMMY_STRING,
      firstName: DUMMY_STRING,
      lastName: DUMMY_STRING,
      createdAt: DUMMY_STRING,
      roles: {
        familyId: UPDATEE.FAMILY_ID,
        role: UPDATEE.ROLE
      }
    };

    const mockServer = mockApolloServer({
      uid: UPDATER.USER_ID
    });
    testServer = mockServer.testServer;
    mockUserModelInstance = mockServer.models.user.instance as any;

    mockUserModelInstance.getUser
      .mockResolvedValueOnce(updaterDoc)
      .mockResolvedValueOnce(updateeDoc);
    mockUserModelInstance.hasRoleInFamily.mockReturnValue(true);
    mockUserModelInstance.isInFamily.mockReturnValue(true);

    const { mutate } = createTestClient(testServer);
    const input: UpdateRoleInput = {
      userId: UPDATEE.USER_ID,
      role: {
        familyId: UPDATEE.FAMILY_ID,
        role: UPDATEE.NEW_ROLE
      }
    };

    const res = await mutate({
      mutation: UPDATE_ROLE,
      variables: {
        input
      }
    });

    const expectedOutput: UpdateRoleOutput = {
      userId: UPDATEE.USER_ID,
      role: {
        familyId: UPDATEE.FAMILY_ID,
        role: UPDATEE.NEW_ROLE
      }
    };

    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchObject({
      updateRole: {
        ...expectedOutput
      }
    });
  });
});
