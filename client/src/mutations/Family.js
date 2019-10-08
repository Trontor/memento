import gql from "graphql-tag";

export const CREATE_NEW_FAMILY = gql`
  mutation createFamily($input: CreateFamilyInput!) {
    createFamily(input: $input) {
      familyId
    }
  }
`;

export const LOAD_FAMILY = gql`
  query loadFamily($id: ID!) {
    currentUser {
      userId
    }
    family(familyId: $id) {
      name
      createdAt
      imageUrl
      colour
      members {
        userId
        firstName
        lastName
      }
    }
  }
`;
