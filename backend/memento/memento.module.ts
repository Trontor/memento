import { Module, Scope, Provider } from "@nestjs/common";
import { MementoService } from "./memento.service";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { MementoSchema } from "./schema/memento.schema";
import { FileModule } from "../file/file.module";
import { MementoResolver } from "./memento.resolver";
import { FamilyModule } from "../family/family.module";
import { MementosDataLoader } from "./dataloader/memento.dataloader";
import { UsersDataLoader } from "../user/user.dataloader";
import { UserModule } from "../user/user.module";
import { FamiliesDataLoader } from "../family/family.data-loader";
import { AuthModule } from "../auth/auth.module";

const MementosDataLoaderProvider: Provider = {
  inject: [getModelToken("Memento"), UsersDataLoader, FamiliesDataLoader],
  useFactory: MementosDataLoader.create,
  provide: MementosDataLoader,
  scope: Scope.REQUEST,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Memento", schema: MementoSchema }]),
    FileModule,
    FamilyModule,
    UserModule, // to inject UsersDataLoader into MementosDataLoaderProvider,
    AuthModule, // for auth guard
  ],
  providers: [MementoService, MementoResolver, MementosDataLoaderProvider],
})
export class MementoModule {}
