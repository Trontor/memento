import gql from "graphql-tag";

export const GET_DASHBOARD_INFORMATION = gql`
  query currentUser {
    currentUser {
      userId
      firstName
      families {
        familyId
      }
    }
  }
`;
