import React from "react";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { FormHelpText, UserAvatar } from "ui/Forms";
import { List } from "ui/Radio";
import {
  BookmarksWrapper,
  Item,
  Description,
  UploaderBox,
  UploaderText,
  UploaderAvatar,
} from "./BookmarksStyles";
import { CardOptions } from "../MementoCard/MementoCardStyles";
import BookmarksNoMemento from "./BookmarksNoMemento";
import { Bookmark } from "styled-icons/boxicons-solid";

export default function Bookmarks(props) {
  const imageSrc = [
    "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //"https://images.unsplash.com/photo-1564595063998-fc31c376d0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  ];

  if (imageSrc.length < 3) {
    return <BookmarksNoMemento />;
  }
  return (
    <Container>
      <Header underline>Saved Mementos</Header>

      {/* Bookmarks Card*/}
      <BookmarksWrapper>
        {imageSrc.map(image => (
          <Item>
            <img src={image} alt="blah" />
            <Description>
              {/* Memento Title */}
              <h3>Bookmarks</h3>
              {/* Memento Tags */}
              <div>
                <List size="20px" />
                test
              </div>
              {/* Uploader Information */}
              <UploaderBox>
                <UploaderAvatar>
                  <i class="fas fa-user-circle"></i>
                </UploaderAvatar>
                <UploaderText>
                  Uploader
                  <FormHelpText>Uploader's Family</FormHelpText>
                </UploaderText>
                <CardOptions>
                  <i class="far fa-bookmark"></i>
                </CardOptions>
              </UploaderBox>
            </Description>
          </Item>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
