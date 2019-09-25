import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      dateOfBirth
      gender
      location
    }
  }
`;
