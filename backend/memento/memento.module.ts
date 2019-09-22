import { Module } from "@nestjs/common";
import { MementoService } from "./memento.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MementoSchema } from "./schema/memento.schema";
import { FileModule } from "../file/file.module";
import { MementoResolver } from "./memento.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Memento", schema: MementoSchema }]),
    FileModule,
  ],
  providers: [MementoService, MementoResolver],
})
export class MementoModule {}
