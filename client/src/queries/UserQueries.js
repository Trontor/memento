import gql from "graphql-tag";
export const GET_USER_FAMILIES = gql`
  query getFamily {
    currentUser {
      userId
      families {
        familyId
        name
      }
    }
  }
`;
