import React, { useState } from "react";
import {
  DashboardContainer,
  Navbar,
  SearchBar,
  TextWrapper,
  Sidebar,
  SidebarItem
} from "./DashboardStyles";
import {
  ButtonPrimary,
  ButtonSecondary,
  MenuIcon,
  CloseMenuIcon
} from "ui/Buttons";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpened] = useState(false);
  const toggleSidebarOpened = () => setSidebarOpened(!isSidebarOpen);
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  if (error) {
    console.log(error.graphQLErrors);
  }
  if (data) {
    console.log("Success:", data);
  }
  return (
    <DashboardContainer>
      {/* Navigation Menu Bar */}
      <Navbar>
        <MenuIcon onClick={toggleSidebarOpened}>
          <i className="fas fa-bars fa-4x"></i>
        </MenuIcon>
        <SearchBar
          placeholder="Search artefacts..."
          menuClick={isSidebarOpen}
        />
      </Navbar>

      {/* Side Menu Bar */}
      <Sidebar menuClick={isSidebarOpen}>
        <Navbar onSidebar={isSidebarOpen}>
          <CloseMenuIcon onClick={toggleSidebarOpened}>
            <i className="fas fa-times fa-4x"></i>
          </CloseMenuIcon>
          <SearchBar
            placeholder="Search artefacts..."
            onSidebar={isSidebarOpen}
          />
        </Navbar>
        {/* Items inside sidebar */}
        <ul>
          <h2>My Families</h2>
          <SidebarItem>
            <a href="#">Leung</a>
          </SidebarItem>
          <SidebarItem>
            <a href="#">Febriana</a>
          </SidebarItem>
          <SidebarItem>
            <a href="#">Joshi</a>
          </SidebarItem>
          <SidebarItem>
            <a href="#">Huang</a>
          </SidebarItem>
        </ul>
      </Sidebar>

      {/* Main Text */}
      <TextWrapper>
        <h2>You don't belong to any Families at the moment. </h2>
        <p>What would you like to do for now?</p>
        <ButtonPrimary>Create a Family</ButtonPrimary>
        <ButtonSecondary>Join a Family</ButtonSecondary>
      </TextWrapper>
    </DashboardContainer>
  );
}
