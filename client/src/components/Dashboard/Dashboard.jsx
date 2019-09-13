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
    <>
      {/* Main Text */}
      <DashboardContainer>
        <Sidebar />
        <TextWrapper>
          {user && <div>{user.firstName}</div>}
          <h2>You don't belong to any Families at the moment. </h2>
          <p>Get started with one of the following actions: </p>
          <ButtonWrapper onClick={() => props.history.push("/create-family")}>
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
