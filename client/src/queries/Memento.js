import gql from "graphql-tag";

export const GET_MEMENTOS = gql`
  query getMementos($id: ID!) {
    mementos(familyId: $id) {
      mementoId
      title
      uploader {
        userId
        imageUrl
        firstName
        lastName
      }
      people {
        firstName
        lastName
      }
      beneficiaries {
        firstName
        lastName
      }
      type
      description
      location
      detectedLabels {
        name
        confidence
      }
      media {
        type
        url
        caption
      }
      dates {
        day
        month
        year
      }
      tags
      createdAt
      updatedAt
    }
  }
`;
