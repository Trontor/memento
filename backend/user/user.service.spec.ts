import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { FileService } from "../file/file.service";
import { getModelToken } from "@nestjs/mongoose";
import faker from "faker";
import { User } from "./dto/user.dto";
import { USER_WITH_ADMIN_ROLE } from "../common/test/user.mock";
import { Types, Model } from "mongoose";
import { Gender } from "./dto/gender.dto";
import { UserDocument, UserModel } from "./schema/user.schema";
import { FamilyRole } from "./dto/role.dto";
import { RoleInput } from "./input/role.input";
import { MementoService } from "../memento/memento.service";

describe("UserService", () => {
  let userService: UserService;
  let userModel: Model<UserDocument> & jest.Mock<Model<UserDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: FileService,
          useValue: {},
        },
        {
          provide: getModelToken("User"),
          useValue: (() => {
            const model: any = jest.fn().mockImplementation(() => ({
              save: jest.fn().mockImplementation(() => ({
                toDTO: jest.fn().mockReturnValue({}),
              })),
            }));
            model.findOne = jest.fn();
            model.findOneAndUpdate = jest.fn();
            model.findById = jest.fn();
            return model;
          })(),
        },
        {
          provide: MementoService,
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userModel = module.get(getModelToken("User"));
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("create new user", () => {
    it("should create user successfully", async () => {
      jest.spyOn(userService, "doesEmailExist").mockResolvedValueOnce(false);
      const user: User = await userService.createUser({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: "password",
      });
      expect(user).toBeDefined();
    });

    it("should throw error if email already exists", async () => {
      jest.spyOn(userService, "doesEmailExist").mockResolvedValueOnce(true);
      await expect(
        userService.createUser({
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password: "password",
        }),
      ).rejects.toThrowError();
    });
  });

  describe("update user", () => {
    it("should throw error if updating another user", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;
      await expect(
        userService.update(user, {
          userId: Types.ObjectId().toHexString(),
          gender: Gender.Female,
        }),
      ).rejects.toThrowError();
    });

    it("should update existing user successfully", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;
      jest
        .spyOn(userModel, "findOneAndUpdate")
        .mockResolvedValueOnce(new UserModel({ gender: Gender.Female }));
      const updatedUser: User = await userService.update(user, {
        userId: user.userId,
        gender: Gender.Female,
      });
      expect(updatedUser).toBeDefined();
      expect(updatedUser.gender).toEqual(Gender.Female);
    });

    it("should throw error if user does not exist", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;
      jest.spyOn(userModel, "findOneAndUpdate").mockResolvedValueOnce(null); // user does not exist
      await expect(
        userService.update(user, {
          userId: user.userId,
          gender: Gender.Female,
        }),
      ).rejects.toThrowError();
    });
  });

  describe("create role", () => {
    it("should create role succesfully", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;
      const newRole: RoleInput = {
        familyId: Types.ObjectId().toHexString(),
        familyRole: FamilyRole.Admin,
      };
      jest
        .spyOn(userModel, "findOneAndUpdate")
        .mockResolvedValueOnce(
          new UserModel({ _id: user.userId, roles: [newRole] }),
        );
      const userDoc: UserDocument = await userService.createRole(
        user.userId,
        newRole,
      );
      expect(userDoc).toBeDefined();
    });
  });

  describe("find one by id", () => {
    it("should throw error if invalid id", async () => {
      await expect(userService.findOneById("abc")).rejects.toThrowError();
    });

    it("should return user DTO if user exists", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;
      jest
        .spyOn(userModel, "findById")
        .mockResolvedValueOnce(new UserModel({ _id: user.userId }));
      const retrievedUser: User = await userService.findOneById(user.userId);
      expect(retrievedUser).toBeDefined();
    });
  });
});
