import DataLoader from "dataloader";
import { Model } from "mongoose";
import { MementoDocument } from "./schema/memento.schema";
import { FamilyId } from "../family/family.dataloader";

// Loader by Memento Id
export const MEMENTO_LOADER_BY_ID = "MEMENTO_LOADER_BY_ID";
export type MementoId = string;
export type MementoDataLoaderById = DataLoader<MementoId, MementoDocument>;

/**
 * Factory for dataloader that retrieves `MementoDocument` by `id`
 * @param Mementos MongoDB model Memento model
 */
export const createMementoLoaderById = (
  Mementos: Model<MementoDocument>,
): MementoDataLoaderById => {
  const batchFn: DataLoader.BatchLoadFn<
    MementoId,
    MementoDocument
  > = async keys => {
    const loadedEntities: MementoDocument[] = await Mementos.find({
      _id: { $in: keys },
    });

    // sort by keys
    return keys.map(
      key =>
        loadedEntities.find(entity => entity.id === key) ||
        new Error(`Memento ${key} not found`),
    );
  };
  return new DataLoader<FamilyId, MementoDocument>(batchFn);
};
