import { Module, forwardRef } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilyModule } from "../family/family.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => FamilyModule),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    FileModule
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
