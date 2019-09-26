import { Module, forwardRef, Provider, Scope } from "@nestjs/common";
import { FamilyService } from "./family.service";
import { FamilyResolver } from "./family.resolvers";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { FamilySchema, FAMILY_COLLECTION } from "./schema/family.schema";
import { UserModule } from "../user/user.module";
import { InviteModule } from "../invite/invite.module";
import { FileModule } from "../file/file.module";
import {
  FAMILY_LOADER_BY_ID,
  FamilyDataLoaderById,
  createFamilyLoaderById,
} from "./family.dataloader";

/**
 * Nestjs request-scoped provider for a Dataloader<UserId, UserDocument>
 */
export const FamilyDataLoaderProvider: Provider<FamilyDataLoaderById> = {
  inject: [getModelToken(FAMILY_COLLECTION)],
  useFactory: createFamilyLoaderById,
  provide: FAMILY_LOADER_BY_ID,
  scope: Scope.REQUEST,
};
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FAMILY_COLLECTION, schema: FamilySchema },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => InviteModule),
    FileModule,
  ],
  providers: [FamilyService, FamilyResolver, FamilyDataLoaderProvider],
  exports: [FamilyService, FAMILY_LOADER_BY_ID],
})
export class FamilyModule {}
