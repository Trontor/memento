import { Test, TestingModule } from "@nestjs/testing";
import { InviteService } from "./invite.service";
import { FamilyService } from "../family/family.service";
import { getModelToken } from "@nestjs/mongoose";
import { ConfigService } from "../config/config.service";
import { MailerService } from "@nest-modules/mailer";
import { USER_WITH_ADMIN_ROLE } from "../common/test/user.mock";
import { Model } from "mongoose";
import { InviteDocument } from "./schema/invite.schema";
import { MockInviteDocument } from "./invite.test.utils";

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
});
