import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  TextWrapper,
  DashboardButtons,
  ButtonHeading,
  GoToButton,
  InviteFamily,
  CreateFamily
} from "./DashboardStyles";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Container } from "ui/Helpers";
import { SiteGrid } from "ui/Layout";

export default function Dashboard(props) {
  const { data, error /*, loading*/ } = useQuery(GET_CURRENT_USER);
  let user = {};
  if (error) {
    console.log("Error loading user data:", error);
  }
  if (data.currentUser) {
    user = data.currentUser;
    console.log("Success:", user);
  }
  return (
    <SiteGrid>
      <Container>
        <TextWrapper>
          {user && <div>{user.firstName}</div>}
          <h2>You don't belong to any Families at the moment. </h2>
          <p>Get started with one of the following actions: </p>
          <DashboardButtons
            onClick={() => props.history.push("/create-family")}
          >
            <CreateFamily size="55px" />
            <ButtonHeading>
              Create a Family
              <span>And get the rest of your family on board.</span>
            </ButtonHeading>
            <GoToButton />
          </DashboardButtons>
          <DashboardButtons>
            <InviteFamily size="55px" />
            <ButtonHeading>
              Join an existing Family
              <span>Got an invite code? Join your family.</span>
            </ButtonHeading>
            <GoToButton />
          </DashboardButtons>
        </TextWrapper>
      </Container>
    </SiteGrid>
  );
}
