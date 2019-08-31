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

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpened] = useState(false);
  const toggleSidebarOpened = () => setSidebarOpened(!isSidebarOpen);

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
          <TextList>
            <a href="#">Leung</a>
          </TextList>
          <TextList>
            <a href="#">Siu</a>
          </TextList>
          <TextList>Febriana</TextList>
          <TextList>Joshi</TextList>
          <TextList>Huang</TextList>
          <TextList>Wei</TextList>
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
          <SidebarButtonPrimary>Sign Out</SidebarButtonPrimary>
        </Footer>
      </SidebarContainer>
    </>
  );
}
