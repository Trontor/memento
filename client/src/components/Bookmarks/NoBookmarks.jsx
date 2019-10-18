import React from "react";
import { Container } from "ui/Helpers";
import {
  TextWrapper,
  DashboardButtons,
  ButtonHeading,
  GoToButton,
} from "../Dashboard/DashboardStyles";
import { NoBookmarksIcon, IconButton } from "./BookmarksStyles";
import { useHistory } from "react-router-dom";

export default function NoBookmarks(props) {
  const history = useHistory();
  return (
    <Container>
      <TextWrapper>
        {/* Bookmarks Icon */}
        <NoBookmarksIcon size="150px" />
        <h2>Oops... You don't have any bookmarks yet.</h2>
        <p>You can add bookmark to your favourite memento. </p>
        <p>What would you like to do instead?</p>

        <DashboardButtons>
          {/* View my mementos button*/}
          <IconButton>
            <i className="far fa-paper-plane" />
          </IconButton>
          <ButtonHeading onClick={() => history.push("/mementos")}>
            View my Mementos
            <span>And save your favourite memento.</span>
          </ButtonHeading>
          <GoToButton />
          {/* View my mementos button*/}
          {/* <IconButton>
            <i className="far fa-gem" />
          </IconButton>
          <ButtonHeading onClick={() => history.push("/mementos")}>
            Go back to the dashboard
            <span>And save your favourite memento.</span>
          </ButtonHeading>
          <GoToButton /> */}
        </DashboardButtons>
      </TextWrapper>
    </Container>
  );
}
