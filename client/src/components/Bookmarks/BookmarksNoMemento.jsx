import React from "react";
import { Container } from "ui/Helpers";
import {
  TextWrapper,
  DashboardButtons,
  ButtonHeading,
  GoToButton,
} from "../Dashboard/DashboardStyles";
import { NoBookmarksIcon, IconButton } from "./BookmarksStyles";

export default function BookmarksNoMemento(props) {
  return (
    <Container>
      <TextWrapper>
        {/* Bookmarks Icon */}
        <NoBookmarksIcon size="150px" />
        <h2>Oops... You don't have any bookmarks yet.</h2>
        <p>You can add bookmark to your favourite memento. </p>

        {/* View my memento button*/}
        <DashboardButtons>
          <IconButton>
            <i class="far fa-paper-plane" />
          </IconButton>
          <ButtonHeading>
            View my Memento
            <span>And save your favourite memento.</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>
      </TextWrapper>
    </Container>
  );
}
