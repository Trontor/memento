import gql from "graphql-tag";

export const GET_DASHBOARD_INFORMATION = gql`
  query currentUser {
    currentUser {
      userId
      firstName
      families {
        familyId
        name
      }
    }
  }
`;

export const GET_MONTHLY_MEMENTOS = gql`
  query monthlyMementos {
    allMyMementosThisMonth {
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
      family {
        colour
        name
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

      bookmarkedBy {
        userId
      }
    }
  }
`;
