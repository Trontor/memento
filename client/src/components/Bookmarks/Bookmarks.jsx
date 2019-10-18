import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { FormHelpText } from "ui/Forms";
import { MementoOverview } from "../MementoCard/MementoCardStyles";
import {
  BookmarksWrapper,
  Item,
  Description,
  UploaderBox,
  UploaderText,
  UploaderAvatar,
  BookmarksIcon,
} from "./BookmarksStyles";
import NoBookmarks from "./NoBookmarks";
import { GET_BOOKMARKS } from "queries/Bookmarks";
import { DELETE_BOOKMARK } from "mutations/Memento";
import JollyLoader from "components/JollyLoader/JollyLoader";

export default function Bookmarks(props) {
  const [bookmarks, setBookmarks] = useState([]);

  const { refetch, loading } = useQuery(GET_BOOKMARKS, {
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      if (data && data.currentUser) setBookmarks(data.currentUser.bookmarks);
      console.log(data);
    },
  });
  const [removeBookmark] = useMutation(DELETE_BOOKMARK, {
    onCompleted: data => {
      refetch();
    },
  });
  if (loading) {
    return <JollyLoader />;
  }
  if (bookmarks.length === 0) {
    return <NoBookmarks />;
  }

  return (
    <Container>
      <Header underline>Saved Mementos</Header>

      {/* Bookmarks Card*/}
      <BookmarksWrapper>
        {bookmarks.map(memento => (
          <Item>
            {memento.media.length > 0 && (
              <img alt="blah" src={memento.media[0].url} />
            )}
            <Description>
              {/* Memento Title */}
              <h3>{memento.title}</h3>
              <MementoOverview>
                {/* Memento Date */}
                <span>
                  <i className="far fa-clock" /> {memento.dates[0].year}
                </span>
                {/* Memento Location */}
                <span>
                  <i className="fas fa-map-marker-alt" />
                  {memento.location}
                </span>
              </MementoOverview>
              <UploaderBox>
                <UploaderAvatar>
                  {!memento.uploader.imageUrl ? (
                    <i className="fas fa-user-circle"></i>
                  ) : (
                    <img
                      src={memento.uploader.imageUrl}
                      alt={memento.uploader.firstName}
                    />
                  )}
                </UploaderAvatar>
                <UploaderText>
                  {memento.uploader.firstName}
                  <FormHelpText>{memento.family.name}</FormHelpText>
                  {/*change family group name */}
                </UploaderText>
                <BookmarksIcon>
                  <i
                    className="far fa-bookmark"
                    onClick={() =>
                      removeBookmark({ variables: { id: memento.mementoId } })
                    }
                  ></i>
                </BookmarksIcon>
              </UploaderBox>
            </Description>
          </Item>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
