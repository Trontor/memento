import gql from "graphql-tag";

export const GET_MEMENTOS = gql`
  query getMementos($id: ID!) {
    currentUser {
      userId
    }
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

      bookmarkedBy {
        userId
      }
    }
  }
`;

export const GET_MY_MEMENTOS = gql`
  query getMyUploadedMementos {
    getMyUploadedMementos {
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

export const GET_A_MEMENTO = gql`
  query getMemento($id: ID!) {
    memento(mementoId: $id) {
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
