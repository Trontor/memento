import gql from "graphql-tag";
export const GET_USER_FAMILIES = gql`
  query getFamily {
    currentUser {
      families {
        familyId
        name
      }
    }
  }
`;
