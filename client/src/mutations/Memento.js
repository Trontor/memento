import gql from "graphql-tag";

export const CREATE_NEW_MEMENTO = gql`
  mutation newMemento($input: CreateMementoInput!) {
    createMemento(input: $input) {
      mementoId
      detectedLabels {
        name
      }
    }
  }
`;

export const ADD_BOOKMARK = gql`
  mutation bookmark($id: ID!) {
    bookmark(mementoId: $id) {
      mementoId
    }
  }
`;

export const DELETE_BOOKMARK = gql`
  mutation bookmark($id: ID!) {
    deleteBookmark(mementoId: $id) {
      mementoId
    }
  }
`;

export const UPDATE_MEMENTO = gql`
  mutation updateMemento($input: UpdateMementoInput!) {
    updateMemento(input: $input) {
      mementoId
    }
  }
`;
