import gql from "graphql-tag";

export default gql`
  query currentUser {
    currentUser {
      userId
      firstName
      lastName
      dateOfBirth
      imageUrl
      location
      gender
      email
    }
  }
`;
