import { Module, forwardRef, Scope } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthResolver } from "./auth.resolvers";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
