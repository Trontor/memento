import { Module, Provider, Scope, forwardRef } from "@nestjs/common";
import { MementoService } from "./memento.service";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { MementoSchema } from "./schema/memento.schema";
import { FileModule } from "../file/file.module";
import { MementoResolver } from "./memento.resolver";
import { FamilyModule } from "../family/family.module";
import {
  MementoDataLoaderById,
  createMementoLoaderById,
  MEMENTO_LOADER_BY_ID,
} from "./memento.dataloader";
import { UserModule } from "../user/user.module";

/**
 * Nestjs request-scoped provider for a Dataloader<UserId, UserDocument>
 */
export const MementoDataLoaderProvider: Provider<MementoDataLoaderById> = {
  inject: [getModelToken("Memento")],
  useFactory: createMementoLoaderById,
  provide: MEMENTO_LOADER_BY_ID,
  scope: Scope.REQUEST,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Memento", schema: MementoSchema }]),
    FileModule,
    forwardRef(() => FamilyModule),
    forwardRef(() => UserModule),
  ],
  providers: [MementoService, MementoResolver, MementoDataLoaderProvider],
  exports: [MEMENTO_LOADER_BY_ID],
})
export class MementoModule {}
