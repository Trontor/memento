import React from "react";
import {
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
  SidebarHeader,
  SearchBar,
  SearchIcon,
  SearchInput,
  FamilyListContainer,
  TextList,
  MenuContainer,
  SignOutButton
} from "./SidebarStyles";
import { withRouter } from "react-router-dom";
import { Logo } from "ui/Logos";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_FAMILIES } from "queries/UserQueries";
import { Spinner } from "ui/Loaders";

const Sidebar = props => {
  // Check for a authentication token, if not - redirect to the login page
  if (!localStorage.getItem("AUTH-TOKEN")) {
    props.history.push("/login");
  }
  let families = [];
  const { loading, error, data } = useQuery(GET_USER_FAMILIES);
  const signOut = () => {
    localStorage.removeItem("AUTH-TOKEN");
    props.history.push("/login");
  };
  if (data && data.currentUser) {
    families = data.currentUser.families;
  }

  return (
    <SidebarContainer isOpen={props.sidebarOpen}>
      <SidebarHeader>
        <Logo
          pointer
          size="small"
          onClick={() => props.history.push("/dashboard")}
        />
        <CloseMenu size="25px" title="close menu" onClick={props.toggleSidebar}/>
      </SidebarHeader>
        <SearchBar>
          <SearchIcon />
          <SearchInput type="text" placeholder="Search all artefacts" />
        </SearchBar>
      <FamilyListContainer>
        {families.length > 0 && (
          <h3>My Families</h3>
        )}
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
      <SignOutButton onClick={signOut}>
        Sign Out
      </SignOutButton>
    </SidebarContainer>
  );
};
export default withRouter(Sidebar);
