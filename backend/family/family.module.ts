import { Module } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { FamilyResolver } from "./family.resolvers";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilySchema } from "./schema/family.schema";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Family", schema: FamilySchema }]),
    UserModule
  ],
  providers: [FamilyService, FamilyResolver]
})
export class FamilyModule {}
