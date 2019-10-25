import {
  ButtonHeading,
  CreateFamily,
  DashboardButtons,
  GoToButton,
  IconImg,
  InviteFamily,
  TextWrapper,
} from "components/Dashboard/NewUser/NewUserStyles";

import { Container } from "ui/Helpers";
import React from "react";

export default function InviteNoFamilies(props) {
  return (
    <Container>
      <TextWrapper>
        <IconImg>
          <i className="far fa-sad-cry"></i>
        </IconImg>

        <h2>Oops...you're not an admin of any group yet.</h2>
        <p>You must be an admin to invite members to your group.</p>
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
            <span>Got an invite code? Join your family today!</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>
      </TextWrapper>
    </Container>
  );
}
