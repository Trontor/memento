import React from "react";
import { Container } from "ui/Helpers";
import {
  TextWrapper,
  DashboardButtons,
  ButtonIcons,
} from "../Dashboard/DashboardStyles";
import { NoBookmarksIcon } from "./BookmarksStyles";

export default function Bookmarks(props) {
  const imageSrc = [
    "https://images.unsplash.com/photo-1516668557604-c8e814fdb184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1564595063998-fc31c376d0df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <Container>
      <TextWrapper>
        <NoBookmarksIcon size="150px" />
        <h2>Oops... You don't have any bookmarks yet.</h2>
        <p>You can add bookmarks to your favourite memento. </p>
        <DashboardButtons onClick={() => props.history.push("/bookmarks")}>
          <i class="far fa-paper-plane"></i>
        </DashboardButtons>
      </TextWrapper>
    </Container>
  );
}
