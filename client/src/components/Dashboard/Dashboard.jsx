import React from "react";
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
import { Spinner } from "ui/Loaders";

export default function Dashboard(props) {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  let user = {};

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
    console.log("Success:", user);
  }

  if (loading) {
    return (
      <Spinner size="large" />
    );
  }

  return (
    <Container>
      <TextWrapper>
        <h2>Hello {user.firstName}!</h2>
        <p>Get started with one of the following actions: </p>

        <DashboardButtons
          onClick={() => props.history.push("/create-family")}
        >
          <CreateFamily/>
          <ButtonHeading>
            Create a Family
            <span>And get the rest of your family on board.</span>
          </ButtonHeading>
          <GoToButton />
        </DashboardButtons>

        <DashboardButtons>
          <InviteFamily/>
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
