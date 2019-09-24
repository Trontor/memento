import DataLoader from "dataloader";
import { IDataLoader } from "../../common/data-loader.interface";
import { Model, Types } from "mongoose";
import { MementoDocument } from "../schema/memento.schema";
import { fromHexStringToObjectId } from "../../common/mongo.util";
import { Logger, Injectable, Scope } from "@nestjs/common";
import { UsersDataLoader } from "../../user/user.dataloader";
import { UserDocument } from "../../user/schema/user.schema";
import { FamilyDocument } from "../../family/schema/family.schema";
import { FamiliesDataLoader } from "../../family/family.data-loader";

@Injectable({ scope: Scope.REQUEST })
export class MementosDataLoader
  implements IDataLoader<string, MementoDocument> {
  constructor(
    private readonly dataLoader: DataLoader<string, MementoDocument>,
  ) {}

  public static async create(
    model: Model<MementoDocument>,
    usersDataLoader: UsersDataLoader,
    familiesDataLoader: FamiliesDataLoader,
  ): Promise<MementosDataLoader> {
    Logger.debug("Creating new Mementos dataloader...");

    // define the batch function
    const batchFn = async (keys: string[]): Promise<any> => {
      const loadedDocs: MementoDocument[] = await model
        .find({
          _id: { $in: keys },
        })
        .populate("inFamily")
        .populate("uploadedBy");

      loadedDocs.forEach(doc => {
        const uploader = doc.uploadedBy as UserDocument;
        const family = doc.inFamily as FamilyDocument;
        usersDataLoader.prime(uploader.id, uploader);
        familiesDataLoader.prime(family.id, family);
      });

      return keys.map(
        key =>
          loadedDocs.find(doc => doc.id === key) ||
          new Error(`Memento ${key} not found`),
      ); // sort by keys
    };

    // create the dataloader instance
    const dataLoader = new DataLoader<string, MementoDocument>(batchFn);

    return new MementosDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}
