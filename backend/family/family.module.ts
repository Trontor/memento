import { Module, forwardRef, Provider, Scope } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { FamilyResolver } from "./family.resolvers";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { FamilySchema } from "./schema/family.schema";
import { UserModule } from "../user/user.module";
import { InviteModule } from "../invite/invite.module";
import { FileModule } from "../file/file.module";
import { FamiliesDataLoader } from "./family.data-loader";
import { AuthModule } from "../auth/auth.module";

const FamiliesDataLoaderProvider: Provider = {
  inject: [getModelToken("Family")],
  useFactory: FamiliesDataLoader.create,
  provide: FamiliesDataLoader,
  scope: Scope.REQUEST,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Family", schema: FamilySchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => InviteModule),
    FileModule,
    AuthModule,
  ],
  providers: [FamilyService, FamilyResolver, FamiliesDataLoaderProvider],
  exports: [FamilyService, FamiliesDataLoader],
})
export class FamilyModule {}
