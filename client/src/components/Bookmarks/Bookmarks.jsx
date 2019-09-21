import React from "react";
import { CenterText, Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import {
  BookmarksSearchBar,
  BookmarksSearchIcon,
  BookmarksSearchInput,
  BookmarksWrapper,
  Item,
} from "./BookmarksStyles";

export default function Bookmarks() {
  return (
    <Container>
      <CenterText>
        <Header underline>My Bookmarks</Header>
      </CenterText>
      <BookmarksSearchBar>
        <BookmarksSearchIcon />
        <BookmarksSearchInput type="text" placeholder="Search all bookmarks" />
      </BookmarksSearchBar>
      <BookmarksWrapper>
        <Item>
          <img src="https://images.app.goo.gl/LzEQkq3yv9QQRLjC6" />
          <h2>Birthday Party</h2>
        </Item>
        <Item>Item 1</Item>
        <Item>Item 1</Item>
      </BookmarksWrapper>
    </Container>
  );
}
