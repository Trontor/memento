import { Module, forwardRef } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
