import { db, clientAuth } from "../../utils/firebase/admin";
import UserModel, { UserDocument } from "../User";
import { FamilyRole } from "../../generated/graphql";

jest.mock("../../utils/firebase/admin");

describe("User model unit tests", () => {
  describe("hasRoleInFamily", () => {
    const DUMMY_USER_DOC: UserDocument = {
      email: "dummy@mail.com",
      firstName: "dummy",
      lastName: "dummy",
      createdAt: "dummy",
      roles: {
        dummy: FamilyRole.Admin
      }
    };
    it("should return true if user is admin in family", () => {
      const userModelInstance = new UserModel({ db, clientAuth });
      const familyId = "1234";
      const familyRole = FamilyRole.Admin;
      const userDoc: UserDocument = {
        ...DUMMY_USER_DOC,
        roles: {
          [familyId]: familyRole
        }
      };
      const actual = userModelInstance.hasRoleInFamily(
        userDoc,
        familyRole,
        familyId
      );
      expect(actual).toBe(true);
    });
    it("should return false if user not fam admin", () => {
      const userModelInstance = new UserModel({ db, clientAuth });
      const familyId = "1234";
      const userDoc: UserDocument = {
        ...DUMMY_USER_DOC,
        roles: {
          [familyId]: FamilyRole.Normal
        }
      };
      const actual = userModelInstance.hasRoleInFamily(
        userDoc,
        FamilyRole.Admin,
        familyId
      );
      expect(actual).toBe(false);
    });

    it("should return false if user not in family", () => {
      const userModelInstance = new UserModel({ db, clientAuth });
      const familyId = "1234";
      const userDoc: UserDocument = {
        ...DUMMY_USER_DOC,
        roles: {
          other: FamilyRole.Admin
        }
      };
      const actual = userModelInstance.hasRoleInFamily(
        userDoc,
        FamilyRole.Admin,
        familyId
      );
      expect(actual).toBe(false);
    });
  });
});
