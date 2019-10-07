import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";

/**
 * Thrown when client provides an invalid hex string as a Mongo ObjectId.
 */
class InvalidHexStringId extends BadRequestException {
  constructor(id: string) {
    super(`Invalid hex string id: ${id}`);
  }
}

export const fromHexStringToObjectId = (hexString: string): Types.ObjectId => {
  let id: Types.ObjectId;
  try {
    id = Types.ObjectId(hexString);
  } catch (err) {
    throw new InvalidHexStringId(hexString);
  }
  return id;
};
