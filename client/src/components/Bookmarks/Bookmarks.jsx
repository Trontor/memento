import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_MEMENTOS } from "queries/Memento";
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

export default function Bookmarks(props) {
  const [mementos, setMementos] = useState([]);

  const loadMemento = useQuery(GET_MEMENTOS, {
    variables: {
      id: "5d8c80b8c4a4ad02c5722152",
      //id: "5d849da7a450cc02c84e7629"
    },
    onCompleted: data => {
      if (data && data.mementos) setMementos(data.mementos);
      console.log(data);
    },
  });

  if (mementos.length === 0) {
    return <NoBookmarks />;
  }

  return (
    <Container>
      <Header underline>Saved Mementos</Header>

      {/* Bookmarks Card*/}
      <BookmarksWrapper>
        {mementos.map(memento => (
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
                  <i class="far fa-clock" /> {memento.dates[0].year}
                </span>
                {/* Memento Location */}
                <span>
                  <i class="fas fa-map-marker-alt" />
                  {memento.location}
                </span>
              </MementoOverview>

              <UploaderBox>
                <UploaderAvatar>
                  {!memento.uploader.imageUrl ? (
                    <i class="fas fa-user-circle"></i>
                  ) : (
                    <img
                      src={memento.uploader.imageUrl}
                      alt={memento.uploader.firstName}
                    />
                  )}
                </UploaderAvatar>
                <UploaderText>
                  {memento.uploader.firstName}
                  <FormHelpText>Uploader's Family</FormHelpText>
                  {/*change family group name */}
                </UploaderText>
                <BookmarksIcon>
                  <i class="far fa-bookmark"></i>
                </BookmarksIcon>
              </UploaderBox>
            </Description>
          </Item>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
