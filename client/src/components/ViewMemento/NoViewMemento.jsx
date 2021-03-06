import {
  ButtonHeading,
  CreateFamily,
  DashboardButtons,
  GoToButton,
  InviteFamily,
  TextWrapper,
} from "../Dashboard/NewUser/NewUserStyles";

import { Container } from "ui/Helpers";
import { NoViewMementoIcon } from "./ViewMementoStyles";
import React from "react";

export default function NoViewMemento(props) {
  return (
    <Container>
      <TextWrapper>
        {/* No Memento Icon */}
        <NoViewMementoIcon />
        <h2>Oops... You don't have any memento yet.</h2>
        <p>You can upload memento to your family group. </p>
        <p>What would you like to do instead?</p>

        <DashboardButtons onClick={() => props.history.push("/family/new")}>
          <CreateFamily />
          <ButtonHeading>
            Create a Family
            <span>And get the rest of your family on board.</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>

        <DashboardButtons onClick={() => props.history.push("/invite/accept")}>
          <InviteFamily />
          <ButtonHeading>
            Join an existing Family
            <span>Got an invite code? Join your family.</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>
      </TextWrapper>
    </Container>
  );
  }