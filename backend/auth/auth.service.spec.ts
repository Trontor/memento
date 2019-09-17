import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { IUserService } from "../user/interfaces/IUserService";
import { UserDocument, UserModel } from "../user/schema/user.schema";
import { UserSignupInput } from "../user/input/user.input";

// TODO: test is not working yet

class UserServiceMock implements IUserService {
  async findOneByEmail(email: string): Promise<UserDocument> {
    return new UserModel({ email });
  }
  async createUser(input: UserSignupInput): Promise<UserDocument> {
    return new UserModel(input);
  }
}

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useClass: UserServiceMock
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret,
            signOptions: {
              expiresIn: configService.jwtExpiresIn
            }
          }),
          inject: [ConfigService]
        }),
        ConfigModule
      ],
      providers: [AuthService, UserServiceProvider]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
