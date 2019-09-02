import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthResolver } from "./auth.resolvers";
import { ConfigModule } from "../config/config.module";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    /**
     * Special import due to circular dependency between AuthModule and UserModule.
     */
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    ConfigModule,
    /**
     * Sets up the JwtModule:
     * - the secret used to sign the JWT payload
     * - the expiry period of a token
     * Async is required because we need to dynamically inject
     * the ConfigService which contains the secret and expiry.
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.jwtSecret
        };
        if (configService.jwtExpiresIn) {
          options.signOptions = {
            expiresIn: configService.jwtExpiresIn
          };
        }
        return options;
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
