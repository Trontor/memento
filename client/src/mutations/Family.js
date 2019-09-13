import gql from "graphql-tag";
export const CREATE_NEW_FAMILY = gql`
  mutation createFamily($input: CreateFamilyInput!) {
    createFamily(input: $input) {
      familyId
    }
  }
`;
