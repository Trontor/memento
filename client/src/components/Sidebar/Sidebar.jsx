import React, { useState } from "react";
import {
  MenuButton,
  CloseMenuButton,
  NewGroup,
  EditProfile,
  Setting,
  NewArtefact,
  Invite,
  View
} from "ui/Buttons";
import {
  SidebarContainer,
  SearchHeader,
  SearchBar,
  SearchIcon,
  SearchInput,
  FamilyListContainer,
  TextList,
  MenuContainer,
  Footer,
  SidebarButtonPrimary
} from "./SidebarStyles";
import { MiniLogo } from "components/Logo";
import { withRouter } from "react-router-dom";

const Sidebar = props => {
  // Check for a authentication token, if not - redirect to the login page
  if (!localStorage.getItem("AUTH-TOKEN")) {
    props.history.push("/login");
  }
  const [isSidebarOpen, setSidebarOpened] = useState(false);
  const toggleSidebarOpened = () => setSidebarOpened(!isSidebarOpen);
  const famNames = ["Leung", "Siu", "Febriana", "Joshi", "Wei"];
  const signOut = () => {
    localStorage.removeItem("AUTH-TOKEN");
    props.history.push("/login");
  };

  return (
    <>
      <MenuButton size="35px" onClick={toggleSidebarOpened} />
      <SidebarContainer menuClick={isSidebarOpen}>
        <SearchHeader>
          <CloseMenuButton size="35px" onClick={toggleSidebarOpened} />
          <SearchBar>
            <SearchIcon size="25px" />
            <SearchInput placeholder="Search all artefacts" />
          </SearchBar>
        </SearchHeader>
        <FamilyListContainer>
          <h3>My Families</h3>
          {famNames.map(name => (
            <TextList>
              <a href="#">{name}</a>
            </TextList>
          ))}
        </FamilyListContainer>
        <MenuContainer>
          <TextList>
            <Invite size="25px" />
            <a href="#">Invite Family members</a>
          </TextList>
          <TextList>
            <Setting size="25px" />
            Manage my Family groups
          </TextList>
          <TextList>
            <NewGroup size="25px" />
            New Family Group
          </TextList>
        </MenuContainer>
        <MenuContainer>
          <TextList>
            <NewArtefact size="25px" />
            New Artefact
          </TextList>
          <TextList>
            <View size="25px" />
            View my Artefacts
          </TextList>
        </MenuContainer>
        <MenuContainer>
          <TextList>
            <EditProfile size="25px" />
            Edit profile & account
          </TextList>
        </MenuContainer>
        <Footer>
          <MiniLogo />
          <SidebarButtonPrimary onClick={signOut}>
            Sign Out
          </SidebarButtonPrimary>
        </Footer>
      </SidebarContainer>
    </>
  );
};
export default withRouter(Sidebar);
