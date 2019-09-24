import DataLoader from "dataloader";
import { IDataLoader } from "../common/data-loader.interface";
import { Model, Types } from "mongoose";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { Logger, Injectable, Scope } from "@nestjs/common";
import { FamilyDocument } from "./schema/family.schema";

@Injectable({ scope: Scope.REQUEST })
export class FamiliesDataLoader implements IDataLoader<string, FamilyDocument> {
  private readonly logger = new Logger(FamiliesDataLoader.name);

  constructor(
    private readonly dataLoader: DataLoader<string, FamilyDocument>,
  ) {}

  public static async create(
    model: Model<FamilyDocument>,
  ): Promise<FamiliesDataLoader> {
    Logger.debug("Creating new Families dataloader...");
    const dataLoader = new DataLoader<string, FamilyDocument>(async keys => {
      const objectIds: Types.ObjectId[] = keys.map(k =>
        fromHexStringToObjectId(k as string),
      );
      const loadedEntities = await model.find({
        _id: { $in: objectIds },
      });

      return keys.map(
        key =>
          loadedEntities.find(entity => entity.id === key) ||
          new Error(`Family ${key} not found`),
      ); // sort by keys
    });

    return new FamiliesDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }

  public async loadMany(ids: string[]) {
    return this.dataLoader.loadMany(ids);
  }

  public async prime(id: string, familyDoc: FamilyDocument) {
    return this.dataLoader.prime(id, familyDoc);
  }

  public async clear(id: string) {
    this.logger.debug(`Cleared dataloader for family ${id}`);
    return this.dataLoader.clear(id);
  }
}
