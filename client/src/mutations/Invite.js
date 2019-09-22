import gql from "graphql-tag";

export const INVITE_LIST = gql`
  query familyList {
    currentUser {
      familyRoles {
        familyId
        familyRole
      }
      families {
        familyId
        name
      }
    }
  }
`;

export const INVITE_BY_EMAIL = gql`
  mutation inviteByEmail($input: SendInvitesInput!) {
    inviteByEmail(input: $input) {
      sent
      failed {
        email
        error
      }
    }
  }
`;
