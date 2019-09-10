import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConfigService } from "../config/config.service";
import { ConfigModule } from "../config/config.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { IUserService } from "../user/interfaces/IUserService";
import { UserDocument, UserModel } from "../user/schema/user.schema";
import { User } from "../user/dto/user.dto";
import { UserSignupInput } from "../user/input/user.input";

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
  let mockUserService: IUserService;

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
    mockUserService = module.get<IUserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
