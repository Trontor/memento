import { Test, TestingModule } from "@nestjs/testing";
import { MementoService } from "./memento.service";
import { FileService } from "../file/file.service";
import { VisionService } from "../vision/vision.service";
import { UserService } from "../user/user.service";
import { getModelToken } from "@nestjs/mongoose";
import { MementoDocument } from "./schema/memento.schema";
import { Model } from "mongoose";
import { USER_WITH_ADMIN_ROLE, createUserDTO } from "../common/test/user.mock";
import {
  CREATE_MEMENTO_INPUT,
  MockMementoDocument,
  CREATE_MEMENTO_INPUT_WITH_TAGS,
  CREATE_MEMENTO_INPUT_WITH_MEDIA,
} from "./test/memento.test.utils";
import { FamilyRole } from "../user/dto/role.dto";

describe("MementoService", () => {
  let mementoService: MementoService;
  let userService: UserService;
  let fileService: FileService;
  let mementoModel: Model<MementoDocument> & jest.Mock<Model<MementoDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MementoService,
        {
          provide: FileService,
          useValue: (() => {
            const service: any = jest.fn();
            service.uploadImage = jest.fn();
            return service;
          })(),
        },
        { provide: VisionService, useValue: {} },
        {
          provide: UserService,
          useValue: (() => {
            const service: any = jest.fn();
            service.getUsers = jest.fn();
            return service;
          })(),
        },
        {
          provide: getModelToken("Memento"),
          useValue: (() => {
            const model: any = jest
              .fn()
              .mockImplementation((args: any) => new MockMementoDocument(args));
            model.findById = jest.fn();
            return model;
          })(),
        },
      ],
    }).compile();

    mementoService = module.get(MementoService);
    userService = module.get(UserService);
    fileService = module.get(FileService);
    mementoModel = module.get(getModelToken("Memento"));
  });

  it("should be defined", () => {
    expect(mementoService).toBeDefined();
    expect(userService).toBeDefined();
    expect(fileService).toBeDefined();
    expect(mementoModel).toBeDefined();
  });

  describe("create memento", () => {
    it("should successfully create with beneficiaries", async () => {
      const uploader = USER_WITH_ADMIN_ROLE;
      const uploaderFamilyId: string =
        USER_WITH_ADMIN_ROLE.familyRoles[0].familyId;

      const mementoInput = CREATE_MEMENTO_INPUT;
      mementoInput.familyId = uploaderFamilyId;

      if (!mementoInput.beneficiaries) throw new Error();

      const beneficiary1 = createUserDTO(mementoInput.beneficiaries[0], {
        familyId: uploaderFamilyId,
        familyRole: FamilyRole.Normal,
      });

      const beneficiary2 = createUserDTO(mementoInput.beneficiaries[1], {
        familyId: uploaderFamilyId,
        familyRole: FamilyRole.Normal,
      });

      // fake beneficiaries data
      jest
        .spyOn(userService, "getUsers")
        .mockResolvedValueOnce([beneficiary1, beneficiary2]);
      const memento = await mementoService.createMemento(
        uploader,
        mementoInput,
      );
      expect(memento).toBeDefined();
      expect(memento.beneficiaries).toHaveLength(2);
    });

    it("should successfully create with tags", async () => {
      const memento = await mementoService.createMemento(
        USER_WITH_ADMIN_ROLE,
        CREATE_MEMENTO_INPUT_WITH_TAGS,
      );
      expect(memento).toBeDefined();
    });

    it("should throw error if invalid media", async () => {
      jest.spyOn(fileService, "uploadImage").mockResolvedValueOnce({
        url: "https://some-cdn-123453456.net/key/to/image/in/s3",
        key: "key/to/image/in/s3",
      });
      const memento = await mementoService.createMemento(
        USER_WITH_ADMIN_ROLE,
        CREATE_MEMENTO_INPUT_WITH_MEDIA,
      );
      expect(memento).toBeDefined();
    });
  });
});
