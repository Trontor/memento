import { Module, forwardRef } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InviteSchema } from "./schema/invite.schema";
import { InviteResolver } from "./invite.resolver";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Invite", schema: InviteSchema }]),
    forwardRef(() => UserModule)
  ],
  providers: [InviteService, InviteResolver],
  exports: [InviteService]
})
export class InviteModule {}
