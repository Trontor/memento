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

  console.log(bookmarks);

  return (
    <Container>
      <Header underline>Bookmarks</Header>

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
              <MementoOverview familyColour={memento.family.colour}>
                {/* Memento Date */}
                <span>
                  <i className="far fa-clock" />
                  {moment(
                    memento.dates[0].day.toString().padStart(2, "0") +
                      "/" +
                      memento.dates[0].month.toString().padStart(2, "0") +
                      "/" +
                      memento.dates[0].year,
                    "DD-MM-YYYY",
                  ).format("Do  MMM YYYY")}
                </span>
                {/* Memento Location */}
                {memento.location ? (
                  <span>
                    <i className="fas fa-map-marker-alt" />
                    {memento.location}
                  </span>
                ) : (
                  <span> </span>
                )}
                {/* People Tags */}
                {memento.people && memento.people.length > 0 ? (
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
                ) : (
                  <span> </span>
                )}
              </MementoOverview>
            </BookmarkContent>
            <UploaderBox>
              <UploaderAvatar
                onClick={() =>
                  props.history.push("/family/" + memento.family.familyId)
                }
              >
                {!memento.family.imageUrl ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/1999/1999109.svg"
                    alt={""}
                  />
                ) : (
                  <img
                    src={memento.family.imageUrl}
                    alt={memento.uploader.firstName}
                  />
                )}
              </UploaderAvatar>
              <UploaderText>
                <span>{memento.uploader.firstName}</span>
                <span
                  onClick={() =>
                    props.history.push("/family/" + memento.family.familyId)
                  }
                >
                  {memento.family.name}
                </span>
              </UploaderText>
              <BookmarksIcon>
                <i
                  className="fas fa-bookmark"
                  onClick={() =>
                    removeBookmark({ variables: { id: memento.mementoId } })
                  }
                ></i>
              </BookmarksIcon>
            </UploaderBox>
          </BookmarkCard>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
