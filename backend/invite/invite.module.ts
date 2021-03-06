import { Module, forwardRef } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InviteSchema } from "./schema/invite.schema";
import { InviteResolver } from "./invite.resolver";
import { ConfigModule } from "../config/config.module";
import { FamilyModule } from "../family/family.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Invite", schema: InviteSchema }]),
    forwardRef(() => FamilyModule),
    ConfigModule,
  ],
  providers: [InviteService, InviteResolver],
  exports: [InviteService],
})
export class InviteModule {}
