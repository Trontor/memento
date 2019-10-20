import React from "react";
import {
  ButtonHeading,
  CreateFamily,
  DashboardButtons,
  GoToButton,
  InviteFamily,
  TextWrapper,
} from "./NewUserStyles";
import { Container } from "ui/Helpers";
import { useHistory } from "react-router-dom";

export default function NewUser(props) {
  const history = useHistory();
  const { user } = props;
  return (
    <Container>
      <TextWrapper>
        <h2 data-cy="welcome">Hello {user.firstName}!</h2>
        <p>Get started with one of the following actions: </p>

        <DashboardButtons onClick={() => history.push("/family/new")}>
          <CreateFamily />
          <ButtonHeading>
            Create a Family
            <span>And get the rest of your family on board.</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>

        <DashboardButtons onClick={() => history.push("/invite/accept")}>
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
