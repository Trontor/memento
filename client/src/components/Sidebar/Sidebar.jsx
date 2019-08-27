import React, { useState } from "react";
import {
  ButtonPrimary,
  MenuButton,
  CloseMenuButton,
  NewGroup,
  EditProfile,
  Setting,
  NewArtefact,
  Invite
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
  SettingContainer
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
          <TextList>Leung</TextList>
          <TextList>Siu</TextList>
          <TextList>Febriana</TextList>
          <TextList>Joshi</TextList>
          <TextList>Huang</TextList>
          <TextList>Wei</TextList>
        </FamilyListContainer>
        <MenuContainer>
          <TextList>
            <NewGroup size="25px" />
            New Family Group
          </TextList>
          <TextList>
            <NewArtefact size="25px" />
            New Artefact
          </TextList>
        </MenuContainer>
        <SettingContainer>
          <TextList>
            <Invite size="25px" />
            Invite Family members
          </TextList>
          <TextList>
            <Setting size="25px" />
            Manage my Family groups
          </TextList>
          <TextList>
            <EditProfile size="25px" />
            Edit profile & account
          </TextList>
        </SettingContainer>
        <MiniLogo />
        <ButtonPrimary>Sign Out</ButtonPrimary>
      </SidebarContainer>
    </>
  );
}
