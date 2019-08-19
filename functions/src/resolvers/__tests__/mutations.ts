import { gql } from "apollo-server-express";

export const SIGNUP = gql`
  mutation($input: UserSignupInput!) {
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
  mutation($input: UserLoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      location
      gender
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation($input: UpdateRoleInput!) {
    updateRole(input: $input) {
      userId
      role {
        familyId
        role
      }
    }
  }
`;
