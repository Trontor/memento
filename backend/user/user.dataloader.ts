import DataLoader from "dataloader";
import { UserDocument } from "./schema/user.schema";
import { Model, Types } from "mongoose";
import { fromHexStringToObjectId } from "../common/mongo.util";

/**
 * Unique token used for dependency injection
 */
export const USER_LOADER_BY_ID = "USER_LOADER_BY_ID";

// Alias for user id
export type UserId = string;
// Alias for UserDataLoaderById for readability and abstraction when exported
export type UserDataLoaderById = DataLoader<UserId, UserDocument>;

/**
 * Factory for dataloader that retrieves `UserDocument` by `id`
 * @param Users MongoDB model user model
 */
export const createUserLoaderById = (
  Users: Model<UserDocument>,
): UserDataLoaderById => {
  const batchFn: DataLoader.BatchLoadFn<UserId, UserDocument> = async keys => {
    const objectIds: Types.ObjectId[] = keys.map(k =>
      fromHexStringToObjectId(k as string),
    );
    const loadedEntities = await Users.find({
      _id: { $in: objectIds },
    });

    // sort by keys
    return keys.map(
      key =>
        loadedEntities.find(entity => entity.id === key) ||
        new Error(`User ${key} not found`),
    );
  };
  return new DataLoader<UserId, UserDocument>(batchFn);
};
