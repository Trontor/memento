import { Role, FamilyRole } from "./dto/role.dto";
import { RoleInput } from "./input/role.input";
import { User } from "./dto/user.dto";

/**
 * Checks if an array of roles already contains the same role.
 * @param roles
 * @param role
 */
export const containsRole = (roles: Role[], role: RoleInput): boolean => {
  for (let r of roles) {
    if (r.familyId === role.familyId && r.familyRole === role.familyRole) {
      return true;
    }
  }
  return false;
};

export const isFamilyAdmin = (user: User, familyId: string): boolean => {
  if (!user || !user.familyRoles || !familyId) return false;
  return containsRole(user.familyRoles, {
    familyId,
    familyRole: FamilyRole.Admin
  });
};
