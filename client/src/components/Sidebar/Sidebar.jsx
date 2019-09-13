import React, { useState } from "react";
import {
  MenuButton,
  NewGroup,
  EditProfile,
  Setting,
  NewArtefact,
  Invite,
  View
} from "ui/Buttons";
import {
  SidebarContainer,
  CloseMenu,
  SearchHeader,
  SearchBar,
  SearchIcon,
  SearchInput,
  FamilyListContainer,
  TextList,
  MenuContainer,
  Footer,
  SidebarButtonPrimary,
  ModalBackground
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
      {/* <ModalBackground/> */}
      {/* <MenuButton size="35px" onClick={toggleSidebarOpened} /> */}
      <SidebarContainer menuClick={isSidebarOpen}>
        <SearchHeader>
          <SearchBar>
            <SearchIcon/>
            <SearchInput type="text" placeholder="Search all artefacts" />
          </SearchBar>
          <CloseMenu size="25px" title="close menu"/>
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
            <a href="#">Invite</a>
          </TextList>
          <TextList>
            <Setting size="25px" />
            Manage Family groups
          </TextList>
          <TextList>
            <NewGroup size="25px" />
            New Family group
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
