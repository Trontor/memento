import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
  Scope,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthOutput } from "./dto/auth.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/dto/user.dto";
import { ConfigService } from "../config/config.service";
import { JwtService } from "@nestjs/jwt";
import { mapDocumentToUserDTO } from "../user/schema/user.mapper";
import { checkPassword } from "./auth.util";
import { UserDocument } from "../user/schema/user.schema";
import jwt from "jsonwebtoken";

/**
 * Manages authentication of users using local strategy
 * and JSON Web Tokens (JWT).
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.logger.debug("Creating new instance...");
  }

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
    const { token } = await this.createJwt(userDoc);

    const result: AuthOutput = {
      user: mapDocumentToUserDTO(userDoc),
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
  async createJwt(user: User): Promise<{ data: JwtPayload; token: string }> {
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

    const token = await this.sign(data);

    return {
      data,
      token,
    };
  }

  /**
   * Signs the given payload into a JSON Web Token, and returns the
   * encoded JWT if signing is successful.
   * @param payload the data to be converted into a JWT
   */
  private sign(payload: string | object): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.configService.jwtSecret, (err, encoded) => {
        if (err) {
          this.logger.error(err);
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  /**
   * Validates a JWT from a request by:
   * 1) verifying the JWT (authenticity, expiration)
   * 2) if verified, check that the user still exists
   * 3) return the user object
   * @param token signed token from request
   */
  async validateToken(token: string): Promise<User> {
    this.logger.log(`validate ${token}`);
    const payload = await this.verify(token);
    this.logger.debug(payload);
    this.logger.log(`verify: success`);
    const user: UserDocument = await this.validateJwtPayload(
      payload as JwtPayload,
    );
    this.logger.log(`validate: success`);
    return mapDocumentToUserDTO(user);
  }

  /**
   * Verifies a JWT and returns decoded value if JWT is valid.
   * @param token JSON Web Token
   */
  private verify(token: string): Promise<string | object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.configService.jwtSecret, (err, decoded) => {
        if (err) {
          this.logger.error(err);
          reject(err);
        } else {
          this.logger.debug(decoded);
          resolve(decoded);
        }
      });
    });
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
  private async validateJwtPayload(payload: JwtPayload): Promise<UserDocument> {
    // This will be used when the user has already logged in and has a JWT
    try {
      const user = await this.userService.findOneByEmail(payload.email);
      user.lastSeenAt = new Date();
      user.save();
      return user;
    } catch (err) {
      this.logger.error(err);
      // catch UserNotFoundException and throw UnauthorizedException
      throw new UnauthorizedException(
        "Could not log-in with the provided credentials",
      );
    }
  }
}
