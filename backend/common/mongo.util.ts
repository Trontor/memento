import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";

class InvalidHexStringId extends BadRequestException {
  constructor() {
    super("Invalid hex string id");
  }
}

export const fromHexStringToObjectId = (hexString: string): Types.ObjectId => {
  let id: Types.ObjectId;
  try {
    id = Types.ObjectId(hexString);
  } catch (err) {
    throw new InvalidHexStringId();
  }
  return id;
};
