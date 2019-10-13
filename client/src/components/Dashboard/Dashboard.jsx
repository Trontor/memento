import {
  ButtonHeading,
  CreateFamily,
  DashboardButtons,
  GoToButton,
  InviteFamily,
  TextWrapper,
} from "./DashboardStyles";

import { Container } from "ui/Helpers";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import JollyError from "components/JollyError/JollyError";
import JollyLoader from "components/JollyLoader/JollyLoader";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

const loadingQuotes = [
  "Dashboarding things...",
  "Talking to GraphQL...",
  "UwU",
  ">.< hold on!",
];

export default function Dashboard(props) {
  const [user, setUser] = useState({});
  const { error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      if (data && data.currentUser) {
        setUser(data.currentUser);
      }
    },
  });

  console.log("Rendering with:", user);

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
    return <JollyError />;
  }

  if (loading) {
    return <JollyLoader quotes={loadingQuotes} />;
  }

  return (
    <Container>
      <TextWrapper>
        <h2>Hello {user.firstName}!</h2>
        <p>Get started with one of the following actions: </p>

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
