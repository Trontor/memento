import {
  BookmarkCard,
  BookmarkContent,
  BookmarkImg,
  BookmarksIcon,
  BookmarksWrapper,
  UploaderAvatar,
  UploaderBox,
  UploaderText,
} from "./BookmarksStyles";
import { MementoOverview, PeopleTags } from "../MementoCard/MementoCardStyles";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { Container } from "ui/Helpers";
import { DELETE_BOOKMARK } from "mutations/Memento";
import { FormHelpText } from "ui/Forms";
import { GET_BOOKMARKS } from "queries/Bookmarks";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import NoBookmarks from "./NoBookmarks";
import moment from "moment";

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
          <BookmarkCard>
            {memento.media.length > 0 && (
              <BookmarkImg>
                <img alt="blah" src={memento.media[0].url} />
              </BookmarkImg>
            )}
            <BookmarkContent>
              {/* Memento Title */}
              <h3>{memento.title}</h3>
              <MementoOverview>
                {/* Memento Date */}
                <span>
                  <i className="far fa-clock" />
                  {moment(memento.dates[0].day.toString().padStart(2, "0") + "/" +  memento.dates[0].month.toString().padStart(2, "0") + "/" + memento.dates[0].year).format("Do  MMM YYYY")}
                </span>
                {/* Memento Location */}
                {memento.location && (
                  <span>
                    <i className="fas fa-map-marker-alt" />
                    {memento.location}
                  </span>
                )}
                {/* People Tags */}
                {memento.people && memento.people.length > 0 && (
                  <span>
                    <i className="fas fa-user-tag"></i>
                    <div>
                      {memento.people.map(person => (
                        <PeopleTags key={person.firstName}>
                          {person.firstName} {person.lastName}
                        </PeopleTags>
                      ))}
                    </div>
                  </span>
                )}
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
            </BookmarkContent>
          </BookmarkCard>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
