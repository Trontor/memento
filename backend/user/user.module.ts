import { Module, forwardRef, Scope, Provider } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule, InjectModel, getModelToken } from "@nestjs/mongoose";
import { FamilyModule } from "../family/family.module";
import { FileModule } from "../file/file.module";
import { UsersDataLoader } from "./user.dataloader";

const UsersDataLoaderProvider: Provider = {
  inject: [getModelToken("User")],
  useFactory: UsersDataLoader.create,
  provide: UsersDataLoader,
  scope: Scope.REQUEST,
};

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => FamilyModule),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    FileModule,
  ],
  providers: [UserResolver, UserService, UsersDataLoaderProvider],
  exports: [UserService, UsersDataLoader],
})
export class UserModule {}
