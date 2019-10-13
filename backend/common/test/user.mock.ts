import { User } from "../../user/dto/user.dto";
import * as faker from "faker";
import { Types } from "mongoose";
import { FamilyRole } from "../../user/dto/role.dto";

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
