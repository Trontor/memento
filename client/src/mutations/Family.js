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
    family(familyId: $id) {
      name
      createdAt
      members {
        userId
        firstName
        lastName
      }
    }
  }
`;
