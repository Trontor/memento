import { Module, forwardRef } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { FamilyResolver } from "./family.resolvers";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilySchema } from "./schema/family.schema";
import { UserModule } from "../user/user.module";
import { InviteModule } from "../invite/invite.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Family", schema: FamilySchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => InviteModule)
  ],
  providers: [FamilyService, FamilyResolver],
  exports: [FamilyService]
})
export class FamilyModule {}
