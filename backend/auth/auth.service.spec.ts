import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConfigService } from "../config/config.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { USER_WITH_ADMIN_ROLE } from "../common/test/user.mock";

class MockConfigService {
  constructor() {}

  get jwtExpiresIn() {
    return undefined;
  }
}

describe("AuthService", () => {
  let authService: AuthService;
  let mockJwtService: JwtService & jest.Mock<JwtService>;
  let mockConfigService: ConfigService & jest.Mock<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: new MockConfigService(),
        },
        {
          provide: JwtService,
          useValue: (() => {
            const service: any = jest.fn();
            service.sign = jest.fn();
            return service;
          })(),
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    mockJwtService = module.get(JwtService);
    mockConfigService = module.get(ConfigService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("createJwt", () => {
    it("should create JWT without expiry", () => {
      jest
        .spyOn(mockJwtService, "sign")
        .mockImplementationOnce(() => "some JWT token");
      const payload = authService.createJwt(USER_WITH_ADMIN_ROLE);
      expect(payload).toBeDefined();
    });

    it("should create JWT with expiry", () => {
      const start = new Date();
      const EXPIRES_IN = 1000;
      const expiry = new Date();
      expiry.setSeconds(start.getSeconds() + EXPIRES_IN);

      jest
        .spyOn(mockConfigService, "jwtExpiresIn", "get")
        .mockReturnValueOnce(EXPIRES_IN);
      jest
        .spyOn(mockJwtService, "sign")
        .mockImplementationOnce(() => "some JWT token");

      const payload = authService.createJwt(USER_WITH_ADMIN_ROLE);

      expect(payload).toBeDefined();

      // compare seconds to ignore millisecond difference in expiry time
      if (payload.data.expiration) {
        expect(payload.data.expiration.getTime() / 1000).toBeCloseTo(
          expiry.getTime() / 1000,
        );
      }
    });
  });
});
