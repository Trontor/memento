import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation signup($input: UserSignupInput!) {
    signup(input: $input) {
      token
      user {
        email
        firstName
        lastName
        userId
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        userId
        email
        firstName
        lastName
      }
    }
  }
`;
