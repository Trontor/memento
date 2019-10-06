import gql from "graphql-tag";

export const CREATE_NEW_MEMENTO = gql`
  mutation newMemento($input: CreateMementoInput!) {
    createMemento(input: $input) {
      mementoId
    }
  }
`;
