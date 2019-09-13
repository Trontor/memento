import { InviteDocument } from "./invite.schema";
import { Invite } from "../dto/invite.dto";

/**
 * Maps Mongoose `InviteDocument` to GraphQL `Invite` type.
 */
export const mapDocumentToInviteDTO = (doc: InviteDocument): Invite => {
  return {
    inviteId: doc.id,
    familyId: doc.familyId,
    inviterId: doc.inviterId,
    // datetimes
    createdAt: doc.createdAt,
    expiresAt: doc.expiresAt
  };
};
