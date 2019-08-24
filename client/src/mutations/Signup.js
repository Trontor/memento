import gql from "graphql-tag";
/**
 * GraphQL Mutation to register a new user
 */
export default gql`
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
