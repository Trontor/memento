import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation signup($input: UserSignupInput!) {
    signup(input: $input) {
      token
      user {
        email
        firstName
        lastName
        id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: UserLoginInput!) {
    login(input: $input) {
      token
      user {
        email
        firstName
        lastName
        id
      }
    }
  }
`;
