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
        userId
      }
      beneficiaries {
        firstName
        lastName
      }
      family {
        colour
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
        userId
      }
      beneficiaries {
        firstName
        lastName
      }
      family {
        colour
        familyId
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

export const GET_A_MEMENTO = gql`
  query getMemento($id: ID!) {
    currentUser {
      userId
    }
    memento(mementoId: $id) {
      mementoId
      title
      family {
        familyId
        colour
      }
      uploader {
        userId
        imageUrl
        firstName
        lastName
      }
      people {
        userId
        firstName
        lastName
      }
      beneficiaries {
        firstName
        lastName
        imageUrl
        userId
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
export const GET_VISION_MEMENTO = gql`
  query getMemento($id: ID!) {
    currentUser {
      userId
    }
    memento(mementoId: $id) {
      mementoId
      title
      family {
        familyId
        colour
      }
      detectedLabels {
        name
        confidence
      }
      tags
    }
  }
`;
