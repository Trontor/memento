import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  DashboardContainer,
  TextWrapper,
  ButtonWrapper,
  TextHeading,
  TextDetail,
  NextButton,
  InviteFamily
} from "./DashboardStyles";
import { CreateFamily } from "../../ui/Buttons";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function Dashboard() {
  const { data, error /*, loading*/ } = useQuery(GET_CURRENT_USER);
  if (error) {
    console.log("Error loading user data:", error);
  } else if (data) {
    console.log("Success:", data);
  }
  return (
    <>
      {/* Main Text */}
      <DashboardContainer>
        <Sidebar />
        <TextWrapper>
          <h2>You don't belong to any Families at the moment. </h2>
          <p>Get started with one of the following actions: </p>
          <ButtonWrapper>
            <CreateFamily size="55px" />
            <TextHeading>Create a Family</TextHeading>
            <TextDetail>Get your family to join Memento.</TextDetail>
            <NextButton />
          </ButtonWrapper>
          <ButtonWrapper>
            <InviteFamily size="55px" />
            <TextHeading>Join an existing Family</TextHeading>
            <TextDetail>Got an invite code? Join your family.</TextDetail>
            <NextButton />
          </ButtonWrapper>
        </TextWrapper>
      </DashboardContainer>
    </>
  );
}
