import gql from "graphql-tag";

export const CREATE_NEW_MEMENTO = gql`
  mutation newMemento($input: CreateMementoInput!) {
    createMemento(input: $input) {
      mementoId
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
