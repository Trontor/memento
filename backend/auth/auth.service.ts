import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  InternalServerErrorException
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthOutput } from "./dto/auth.dto";
import { JwtPayload } from "./interfaces/jwtPayload.interface";
import { User } from "../user/dto/user.dto";
import { ConfigService } from "../config/config.service";
import { JwtService } from "@nestjs/jwt";
import { mapDocumentToUserDTO } from "../user/schema/user.mapper";
import { checkPassword } from "./auth.util";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Allows user to log in using Local strategy.
   */
  async loginWithEmailAndPassword(
    email: string,
    passwordAttempt: string
  ): Promise<AuthOutput> {
    // TODO: is this sketchy, exposing the User DB Model outside of the UserService???
    // +: Can put the validation logic in auth service
    // - : exposing sensitive DB information outside userService?
    const userDoc = await this.userService.findOneByEmail(email);

    // Check the supplied password against the hash stored for this email address
    let isMatch = false;
    try {
      isMatch = await checkPassword(passwordAttempt, userDoc.password);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    if (!isMatch) throw new UnauthorizedException();

    // If there is a successful match, generate a JWT for the user
    const { token } = this.createJwt(userDoc);

    // console.log(user);
    const result: AuthOutput = {
      user: mapDocumentToUserDTO(userDoc),
      token
    };
    // TODO: fix type mismatch
    // user.lastSeenAt = new Date();
    // user.save();
    return result;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username, and expiration of the
   * token depending on the environment variable. Expiration could be undefined if there is none set. token is the
   * token created by signing the data.
   * @memberof AuthService
   */
  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.jwtExpiresIn;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setSeconds(expiration.getSeconds() + expiresIn);
    }
    const data: JwtPayload = {
      email: user.email,
      expiration
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt
    };
  }
}
