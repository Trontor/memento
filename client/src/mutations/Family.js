import gql from "graphql-tag";

export const CREATE_NEW_FAMILY = gql`
  mutation createFamily($input: CreateFamilyInput!) {
    createFamily(input: $input) {
      familyId
    }
  }
`;

export const UPDATE_FAMILY = gql`
  mutation updateFamily($input: UpdateFamilyInput!) {
    updateFamily(input: $input) {
      familyId
    }
  }
`;
export const LOAD_FAMILY = gql`
  query loadFamily($id: ID!) {
    currentUser {
      userId
      familyRoles {
        familyId
        familyRole
        __typename
      }
    }
    family(familyId: $id) {
      name
      createdAt
      imageUrl
      colour
      members {
        userId
        lastSeenAt
        familyRoles {
          familyId
          familyRole
        }
        imageUrl
        firstName
        lastName
      }
    }
  }
`;
