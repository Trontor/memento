import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "../../config/config.service";
import { mapDocumentToUserDTO } from "../../user/schema/user.mapper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret
    });
  }

  // Documentation for this here: https://www.npmjs.com/package/passport-jwt
  async validate(payload: JwtPayload) {
    // This is called to validate the user in the token exists
    const user = await this.authService.validateJwtPayload(payload);
    return mapDocumentToUserDTO(user);
  }
}
