import gql from "graphql-tag";

export const GET_BOOKMARKS = gql`
  query bookmarks {
    currentUser {
      bookmarks {
        createdAt
        description
        location
        mementoId
        tags
        title
        type
        updatedAt
        media {
          url
        }
        dates {
          year
          month
          day
          dateId
        }
        uploader {
          imageUrl
          firstName
        }
        family {
          name
          imageUrl
        }
      }
    }
  }
`;
