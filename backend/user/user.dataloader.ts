import DataLoader from "dataloader";
import { IDataLoader } from "../common/data-loader.interface";
import { Model, Types } from "mongoose";
import { UserDocument } from "./schema/user.schema";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { Logger, Injectable, Scope } from "@nestjs/common";

@Injectable()
export class UsersDataLoader implements IDataLoader<string, UserDocument> {
  private readonly logger = new Logger(UsersDataLoader.name);

  constructor(private readonly dataLoader: DataLoader<string, UserDocument>) {}

  public static async create(
    model: Model<UserDocument>,
  ): Promise<UsersDataLoader> {
    Logger.debug("Creating new Users dataloader...");
    const dataLoader = new DataLoader<string, UserDocument>(async keys => {
      const objectIds: Types.ObjectId[] = keys.map(k =>
        fromHexStringToObjectId(k as string),
      );
      const loadedEntities = await model.find({
        _id: { $in: objectIds },
      });

      return keys.map(
        key =>
          loadedEntities.find(entity => entity.id === key) ||
          new Error(`User ${key} not found`),
      ); // sort by keys
    });

    return new UsersDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }

  public async loadMany(ids: string[]) {
    return this.dataLoader.loadMany(ids);
  }

  public async prime(id: string, userDoc: UserDocument) {
    return this.dataLoader.prime(id, userDoc);
  }

  public async clear(id: string) {
    this.logger.debug(`Cleared dataloader for user ${id}`);
    return this.dataLoader.clear(id);
  }
}
