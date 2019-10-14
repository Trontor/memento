import { User } from "../../user/dto/user.dto";
import * as faker from "faker";
import { Types } from "mongoose";
import { FamilyRole, Role } from "../../user/dto/role.dto";
import { UserModel, UserDocument } from "../../user/schema/user.schema";

export const USER_WITH_ADMIN_ROLE: User = {
  userId: Types.ObjectId().toHexString(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  familyRoles: [
    { familyId: Types.ObjectId().toHexString(), familyRole: FamilyRole.Admin },
  ],
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  lastSeenAt: new Date(),
  families: [],
  bookmarks: [],
};

export const createUserDTO = (userId?: string, role?: Role): User => {
  const _userId = userId ? userId : Types.ObjectId().toHexString();
  return {
    userId: _userId,
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    familyRoles: role ? [role] : [],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    lastSeenAt: new Date(),
    families: [],
    bookmarks: [],
  };
};

export const createUserDocWithPassword = async (password: string) => {
  let doc: UserDocument = new UserModel({
    _id: Types.ObjectId(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    lastSeenAt: new Date(),
    password: password,
  });
  await doc.validate();
  return doc;
};
