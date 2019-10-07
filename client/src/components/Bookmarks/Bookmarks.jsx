import React from "react";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { FormHelpText, UserAvatar } from "ui/Forms";
import { List } from "ui/Radio";
import {
  BookmarksWrapper,
  Item,
  Description,
  BookmarksIcon,
  Tags,
  UploaderBox,
  UploaderText,
} from "./BookmarksStyles";

export default function Bookmarks(props) {
  const imageSrc = [
    "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
  ];

  //const tags = ["Date", "Location"];
  let UploaderPic = (
    <UserAvatar size="25px" style={{ margin: "3px 0 0 5px" }} />
  );

  return (
    <Container>
      <Header underline>Saved Mementos</Header>
      <BookmarksWrapper>
        {imageSrc.map(image => (
          <Item>
            <img src={image} alt="blah" />
            <Description>
              <h3>Bookmarks</h3>
              <div>
                <List size="20px" />
                test
              </div>

              <UploaderBox>
                {UploaderPic}
                <UploaderText>
                  Uploader
                  <FormHelpText>Uploader's Family</FormHelpText>
                </UploaderText>
                <BookmarksIcon />
              </UploaderBox>
            </Description>
          </Item>
        ))}
      </BookmarksWrapper>
    </Container>
  );
}
