import { Test, TestingModule } from "@nestjs/testing";
import { FamilyService } from "./family.service";
import { FamilyDocument } from "./schema/family.schema";
import { Model, Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { InviteService } from "../invite/invite.service";
import { USER_WITH_ADMIN_ROLE } from "../common/test/user.mock";
import faker from "faker";
import { User } from "../user/dto/user.dto";
import { FAMILY_DOC } from "./test/family.test.utils";
import { Family } from "./dto/family.dto";

describe("FamilyService", () => {
  let familyService: FamilyService;
  let familyModel: Model<FamilyDocument> & jest.Mock<Model<FamilyDocument>>;
  let userService: UserService;
  let inviteService: InviteService;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: getModelToken("Family"),
          useValue: (() => {
            const model: any = jest.fn().mockImplementation((args: any) => ({
              save: jest.fn(),
              toDTO: jest.fn().mockReturnValue({}),
            }));
            model.findOneAndUpdate = jest.fn();
            model.find = jest.fn();
            return model;
          })(),
        },
        {
          provide: UserService,
          useValue: (() => {
            const service: any = jest.fn();
            service.createRole = jest.fn();
            return service;
          })(),
        },
        {
          provide: InviteService,
          useValue: (() => {
            const service: any = jest.fn();
            service.getInvite = jest.fn();
            return service;
          })(),
        },
        {
          provide: FileService,
          useValue: (() => {
            const service: any = jest.fn();
            service.uploadImage = jest.fn();
            return service;
          })(),
        },
      ],
    }).compile();

    familyService = module.get(FamilyService);
    userService = module.get(UserService);
    inviteService = module.get(InviteService);
    fileService = module.get(FileService);
    familyModel = module.get(getModelToken("Family"));
  });

  it("should be defined", () => {
    expect(familyService).toBeDefined();
    expect(familyModel).toBeDefined();
    expect(userService).toBeDefined();
    expect(inviteService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe("join family", () => {
    it("should not join family if already in family", async () => {
      const inviteId: string = faker.random.uuid();
      const user: User = USER_WITH_ADMIN_ROLE;

      jest.spyOn(inviteService, "getInvite").mockResolvedValueOnce({
        familyId: USER_WITH_ADMIN_ROLE.familyRoles[0].familyId,
        inviteId: inviteId,
        inviterId: user.userId,
        createdAt: new Date(),
        expiresAt: faker.date.future(),
      });

      await expect(
        familyService.joinFamily(user, inviteId),
      ).rejects.toThrowError();
    });

    it("should join family if valid invite", async () => {
      const inviteId: string = faker.random.uuid();
      const user: User = USER_WITH_ADMIN_ROLE;
      jest
        .spyOn(familyModel, "findOneAndUpdate")
        .mockResolvedValueOnce(FAMILY_DOC);

      jest.spyOn(inviteService, "getInvite").mockResolvedValueOnce({
        familyId: Types.ObjectId().toHexString(),
        inviteId: inviteId,
        inviterId: user.userId,
        createdAt: new Date(),
        expiresAt: faker.date.future(),
      });

      const family = await familyService.joinFamily(user, inviteId);
      console.log(family);
      expect(family).toBeDefined();
    });

    it("should throw error if expired invite", async () => {
      const inviteId: string = faker.random.uuid();
      const user: User = USER_WITH_ADMIN_ROLE;

      jest.spyOn(inviteService, "getInvite").mockResolvedValueOnce({
        familyId: Types.ObjectId().toHexString(),
        inviteId: inviteId,
        inviterId: user.userId,
        createdAt: faker.date.past(),
        expiresAt: faker.date.past(),
      });

      await expect(
        familyService.joinFamily(user, inviteId),
      ).rejects.toThrowError();
    });
  });

  describe("create family", () => {
    it("should create new family", async () => {
      const user: User = USER_WITH_ADMIN_ROLE;

      jest.spyOn(fileService, "uploadImage").mockResolvedValueOnce({
        url: "https://some-url.net",
        key: "some key",
      });

      const family = await familyService.createFamily(user, {
        colour: "red",
        description: faker.lorem.paragraph(2),
        image: {},
        name: faker.name.lastName(),
      });
      expect(family).toBeDefined();
    });
  });

  describe("get families", () => {
    it("should get families", async () => {
      jest.spyOn(familyModel, "find").mockResolvedValue([]);
      const families: Family[] = await familyService.getFamilies([
        Types.ObjectId().toHexString(),
        Types.ObjectId().toHexString(),
        Types.ObjectId().toHexString(),
      ]);
      expect(families).toBeInstanceOf(Array);
    });
  });

  describe("update family", () => {
    it("should update family", async () => {
      const user = USER_WITH_ADMIN_ROLE;
      const updateInput = {
        colour: "blue",
        description: faker.lorem.words(10),
        familyId: user.familyRoles[0].familyId,
        image: {},
        name: "New name",
      };

      jest.spyOn(familyModel, "findOneAndUpdate").mockResolvedValue(FAMILY_DOC);
      const family: Family = await familyService.updateFamily(
        user,
        updateInput,
      );

      expect(family).toBeDefined();
    });
  });
});
