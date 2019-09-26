import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthOutput } from "./dto/auth.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/dto/user.dto";
import { ConfigService } from "../config/config.service";
import { JwtService } from "@nestjs/jwt";
import { checkPassword } from "./auth.util";
import { UserDocument } from "../user/schema/user.schema";

/**
 * Manages authentication of users using local strategy
 * and JSON Web Tokens (JWT).
 */
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Allows user to log in using Local strategy.
   */
  async loginWithEmailAndPassword(
    email: string,
    passwordAttempt: string,
  ): Promise<AuthOutput> {
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

    const result: AuthOutput = {
      user: userDoc.toDTO(),
      token,
    };
    userDoc.lastSeenAt = new Date();
    userDoc.save();
    return result;
  }

  /**
   * Creates a JwtPayload for the given User
   *
   * @param {User} user
   * @returns {{ data: JwtPayload; token: string }} The data contains the email, username,
   * and expiration of the token depending on the environment variable. Expiration could
   * be undefined if there is none set. token is the token created by signing the data.
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
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by
   * making sure the user exists
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument>)} returns user
   * @throws UnauthorizedException if user is not found
   * @memberof AuthService
   */
  async validateJwtPayload(payload: JwtPayload): Promise<UserDocument> {
    // This will be used when the user has already logged in and has a JWT
    try {
      const user = await this.userService.findOneByEmail(payload.email);
      user.lastSeenAt = new Date();
      user.save();
      return user;
    } catch (err) {
      // catch UserNotFoundException and throw UnauthorizedException
      throw new UnauthorizedException(
        "Could not log-in with the provided credentials",
      );
    }
  }
}
