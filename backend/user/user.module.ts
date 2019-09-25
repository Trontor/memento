import { Module, forwardRef, Scope, Provider } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { FamilyModule } from "../family/family.module";
import { FileModule } from "../file/file.module";
import {
  createUserLoaderById,
  USER_LOADER_BY_ID,
  UserDataLoaderById,
} from "./user.dataloader";

/**
 * Nestjs request-scoped provider for a Dataloader<UserId, UserDocument>
 */
export const UsersDataLoaderProvider: Provider<UserDataLoaderById> = {
  inject: [getModelToken("User")],
  useFactory: createUserLoaderById,
  provide: USER_LOADER_BY_ID,
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
  exports: [UserService, USER_LOADER_BY_ID],
})
export class UserModule {}
