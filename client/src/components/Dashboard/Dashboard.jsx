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
import { SiteGrid} from "ui/Layout";

export default function Dashboard() {
  const { data, error /*, loading*/ } = useQuery(GET_CURRENT_USER);
  if (error) {
    console.log("Error loading user data:", error);
  } else if (data) {
    console.log("Success:", data);
  }
  return (
    <SiteGrid>
      <Sidebar/>
      <Container>
        <TextWrapper>
          <h2>You don't belong to any Families at the moment. </h2>
          <p>Get started with one of the following actions: </p>
          <DashboardButtons>
            <CreateFamily size="55px" />
            <ButtonHeading>
              Create a Family
              <span>And get the rest of your family on board.</span>
            </ButtonHeading>
            <GoToButton/>
          </DashboardButtons>
          <DashboardButtons>
            <InviteFamily size="55px" />
            <ButtonHeading>
              Join an existing Family
              <span>Got an invite code? Join your family.</span>
            </ButtonHeading>
            <GoToButton/>
          </DashboardButtons>
        </TextWrapper>
      </Container>
    </SiteGrid>
  );
}
