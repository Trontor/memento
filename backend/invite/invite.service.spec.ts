import { Test, TestingModule } from "@nestjs/testing";
import { InviteService } from "./invite.service";
import { FamilyService } from "../family/family.service";
import { getModelToken } from "@nestjs/mongoose";
import { ConfigService } from "../config/config.service";
import { MailerService } from "@nest-modules/mailer";
import { USER_WITH_ADMIN_ROLE } from "../common/test/user.mock";
import { Model } from "mongoose";
import { InviteDocument } from "./schema/invite.schema";
import {
  MockInviteDocument,
  VALID_INVITE_DOC,
  EXPIRED_INVITE_DOC,
} from "./test/invite.test.utils";
import { Invite } from "./dto/invite.dto";
import faker from "faker";

describe("InviteService", () => {
  let inviteService: InviteService;
  let familyService: FamilyService;
  let configService: ConfigService;
  let inviteModel: Model<InviteDocument> & jest.Mock<Model<InviteDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteService,
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: getModelToken("Invite"),
          useValue: (() => {
            const model: any = jest
              .fn()
              .mockImplementation((args: any) => new MockInviteDocument(args));
            model.findById = jest.fn();
            return model;
          })(),
        },
        {
          provide: FamilyService,
          useValue: {},
        },
        {
          provide: MailerService,
          useValue: {},
        },
      ],
    }).compile();

    inviteService = module.get(InviteService);
    familyService = module.get(FamilyService);
    configService = module.get(ConfigService);
    inviteModel = module.get(getModelToken("Invite"));
  });

  it("should be defined", () => {
    expect(inviteService).toBeDefined();
    expect(familyService).toBeDefined();
    expect(configService).toBeDefined();
    expect(inviteModel).toBeDefined();
  });

  describe("create invite", () => {
    it("should successfully create invite", async () => {
      const familyId: string = USER_WITH_ADMIN_ROLE.familyRoles[0].familyId;
      const invite = await inviteService.createInvite(
        USER_WITH_ADMIN_ROLE,
        familyId,
      );
      expect(invite).toBeDefined();
    });
  });

  describe("get invite", () => {
    it("should be defined if invite exists", async () => {
      jest
        .spyOn(inviteModel, "findById")
        .mockResolvedValueOnce(VALID_INVITE_DOC);
      const invite: Invite = await inviteService.getInvite(VALID_INVITE_DOC.id);
      expect(invite).toBeDefined();
      expect(inviteModel.findById).toBeCalledWith(VALID_INVITE_DOC.id);
    });

    it("should throw error if invite does not exist", async () => {
      jest.spyOn(inviteModel, "findById").mockResolvedValueOnce(null);
      await expect(
        inviteService.getInvite(faker.random.uuid()),
      ).rejects.toThrowError();
    });

    it("should throw error if invite is expired", async () => {
      jest
        .spyOn(inviteModel, "findById")
        .mockResolvedValueOnce(EXPIRED_INVITE_DOC);
      await expect(
        inviteService.getInvite(EXPIRED_INVITE_DOC.id),
      ).rejects.toThrowError();
    });
  });
});
