import {
  CloseMenu,
  FamilyListContainer,
  MenuContainer,
  NewFamilyGroup,
  SearchBar,
  SearchIcon,
  SearchInput,
  SidebarContainer,
  SidebarHeader,
  SignOutButton,
  TextList
} from "./SidebarStyles";
import {
  EditProfile,
  Invite,
  NewArtefact,
  View
} from "ui/Buttons";

import { GET_USER_FAMILIES } from "queries/UserQueries";
import { Logo } from "ui/Logos";
import React from "react";
import { Spinner } from "ui/Loaders";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

const Sidebar = props => {
  // Check for a authentication token, if not - redirect to the login page
  if (!localStorage.getItem("AUTH-TOKEN")) {
    props.history.push("/login");
  }
  let families = [];
  const { loading, data } = useQuery(GET_USER_FAMILIES);
  const signOut = () => {
    localStorage.removeItem("AUTH-TOKEN");
    props.history.push("/login");
  };
  if (data && data.currentUser) {
    families = data.currentUser.families;
  }

  const iconSize = "20px";

  return (
    <SidebarContainer isOpen={props.sidebarOpen}>
      <SidebarHeader>
        <Logo
          pointer
          size="small"
          onClick={() => props.history.push("/dashboard")}
        />
        <CloseMenu
          size={iconSize}
          title="close menu"
          onClick={props.toggleSidebar}
        />
      </SidebarHeader>
      <SearchBar>
        <SearchIcon />
        <SearchInput type="text" placeholder="Search all artefacts" />
      </SearchBar>
      <FamilyListContainer>
        {families.length > 0 && <h3>My Families</h3>}
        {loading ? (
          <Spinner />
        ) : (
          families.map(family => (
            <TextList>
              <a href={`/family/${family.familyId}`}>{family.name}</a>
            </TextList>
          ))
        )}
      </FamilyListContainer>
        <NewFamilyGroup onClick={() => props.history.push("/create-family")}>
          New Family group
        </NewFamilyGroup>
      <MenuContainer>
        <TextList>
          <Invite size={iconSize} />
          <a href={`/invite`}>Invite</a>
        </TextList>
      </MenuContainer>
      <MenuContainer>
        <TextList>
          <NewArtefact size={iconSize} />
          <a href={`/new-memento`}>New Memento</a>
        </TextList>
        <TextList>
          <View size={iconSize} />
          View my Mementos
        </TextList>
      </MenuContainer>
      <MenuContainer>
        <TextList>
          <EditProfile size={iconSize} />
          <a href={`/settings`}>Edit profile & account</a>
        </TextList>
      </MenuContainer>
      <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
    </SidebarContainer>
  );
};
export default withRouter(Sidebar);
