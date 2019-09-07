import { Module } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InviteSchema } from "./schema/invite.schema";
import { InviteResolver } from "./invite.resolver";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Invite", schema: InviteSchema }]),
    UserModule
  ],
  providers: [InviteService, InviteResolver]
})
export class InviteModule {}
