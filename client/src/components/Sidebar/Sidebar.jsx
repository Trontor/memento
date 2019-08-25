import React from "react";
import Logo from "../Logo";
import {
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
  MenuContainer
} from "./SidebarStyles";

export default function Sidebar() {
  return (
    <SidebarContainer>
      <SearchHeader>
        <CloseMenuButton size="35px" />
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
      </MenuContainer>
      <Logo />
    </SidebarContainer>
  );
}
