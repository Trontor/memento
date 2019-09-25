import gql from "graphql-tag";

export default gql`
  query currentUser {
    currentUser {
      userId
      firstName
      lastName
      imageUrl
      email
    }
  }
`;
