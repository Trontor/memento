import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Navbar, TextWrapper } from "./DashboardStyles";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
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
      {/* Navigation Menu Bar */}
      <Navbar>
        <Sidebar />
      </Navbar>
      {/* Main Text */}
      <TextWrapper>
        <h2>You don't belong to any Families at the moment. </h2>
        <p>What would you like to do for now?</p>
        <ButtonPrimary>Create a Family</ButtonPrimary>
        <ButtonSecondary>Join a Family</ButtonSecondary>
      </TextWrapper>
    </>
  );
}
