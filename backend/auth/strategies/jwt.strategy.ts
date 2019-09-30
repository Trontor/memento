import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "../../config/config.service";
import { User } from "../../user/dto/user.dto";

/**
 * Validates a JWT token provided in the request header as a
 * Bearer token.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private authService: AuthService, configService: ConfigService) {
    // additional construction using custom config
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  // Documentation for this here: https://www.npmjs.com/package/passport-jwt
  async validate(payload: JwtPayload): Promise<User> {
    // This is called to validate the user in the token exists
    const user = await this.authService.validateJwtPayload(payload);
    return user.toDTO();
  }
}
