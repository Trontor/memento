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
