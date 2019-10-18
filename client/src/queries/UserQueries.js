import gql from "graphql-tag";
export const GET_USER_FAMILIES = gql`
  query getFamily {
    currentUser {
      userId
      families {
        familyId
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: String!) {
    user(userId: $id) {
      userId
      firstName
      lastName
      dateOfBirth
      imageUrl
      location
      hometown
      gender
      placesLived {
        city
        dateMoved
      }
    }
  }
`;
