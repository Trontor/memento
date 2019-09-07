import { Invite } from "./dto/invite.dto";

export const isValidInvite = (invite: Invite): boolean => {
  return new Date(invite.expiresAt) > new Date();
};
