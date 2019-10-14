import { FamilyModel, FamilyDocument } from "../schema/family.schema";
import faker from "faker";

export const FAMILY_DOC: FamilyDocument = new FamilyModel({
  name: faker.name.lastName(),
});
