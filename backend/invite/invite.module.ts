import { Module, forwardRef } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InviteSchema } from "./schema/invite.schema";
import { InviteResolver } from "./invite.resolver";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "../config/config.module";
import { FamilyModule } from "../family/family.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Invite", schema: InviteSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => FamilyModule),
    ConfigModule,
    AuthModule,
  ],
  providers: [InviteService, InviteResolver],
  exports: [InviteService],
})
export class InviteModule {}
