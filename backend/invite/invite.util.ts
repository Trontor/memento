import { Invite } from "./dto/invite.dto";

/**
 * Checks if invite has not expired.
 * @param invite invite DTO
 */
export const isValidInvite = (invite: Invite): boolean => {
  return new Date(invite.expiresAt) > new Date();
};
