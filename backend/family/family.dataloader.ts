import DataLoader from "dataloader";
import { FamilyDocument } from "./schema/family.schema";
import { Model, Types } from "mongoose";
import { fromHexStringToObjectId } from "../common/mongo.util";

/**
 * Unique token used for dependency injection
 */
export const FAMILY_LOADER_BY_ID = "FAMILY_LOADER_BY_ID";

// Alias for family id
export type FamilyId = string;
// Alias for FamilyDataLoaderById for readability and abstraction when exported
export type FamilyDataLoaderById = DataLoader<FamilyId, FamilyDocument>;

/**
 * Factory for dataloader that retrieves `FamilyDocument` by `id`
 * @param Family MongoDB model Family model
 */
export const createFamilyLoaderById = (
  Family: Model<FamilyDocument>,
): FamilyDataLoaderById => {
  const batchFn: DataLoader.BatchLoadFn<
    FamilyId,
    FamilyDocument
  > = async keys => {
    // const objectIds: Types.ObjectId[] = keys.map(k =>
    //   fromHexStringToObjectId(k as string),
    // );

    console.log(keys);
    const loadedEntities = await Family.find({
      _id: { $in: keys },
    }).exec();

    // sort by keys
    return keys.map(
      key =>
        loadedEntities.find(entity => entity.id === key) ||
        new Error(`Family ${key} not found`),
    );
  };

  return new DataLoader<FamilyId, FamilyDocument>(batchFn);
};
