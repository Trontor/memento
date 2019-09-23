import React from "react";
import { CenterText, Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import {
  BookmarksSearchBar,
  BookmarksSearchIcon,
  BookmarksSearchInput,
  BookmarksWrapper,
  Item,
  Description,
  BookmarksIcon,
} from "./BookmarksStyles";

export default function Bookmarks() {
  const imageSrc = [
    "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1511948374796-056e8f289f34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2127&q=80",
    "https://images.unsplash.com/photo-1549767742-ccfdeb07b71d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "https://images.unsplash.com/photo-1513899337336-48b3db5df46e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  ];

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
        {imageSrc.map(image => (
          <Item>
            <img src={image} alt="blah" />
            <Description>
              <BookmarksIcon />
              <h2>Bookmarks</h2>
            </Description>
          </Item>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
