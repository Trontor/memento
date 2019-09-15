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
  const [isSidebarOpen, setSidebarOpened] = useState(false);
  const toggleSidebarOpened = () => setSidebarOpened(!isSidebarOpen);
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
    <>
      {/* <ModalBackground/> */}
      {/* <MenuButton size="35px" onClick={toggleSidebarOpened} /> */}
      <SidebarContainer menuClick={isSidebarOpen}>
        <Logo
          padding="20px"
          pointer
          small
          onClick={() => props.history.push("/dashboard")}
        />
        <SearchHeader>
          <SearchBar>
            <SearchIcon />
            <SearchInput type="text" placeholder="Search all artefacts" />
          </SearchBar>
          <CloseMenu size="25px" title="close menu" />
        </SearchHeader>
        <FamilyListContainer>
          <h3>My Families</h3>
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
        <Footer>
          <SidebarButtonPrimary onClick={signOut}>
            Sign Out
          </SidebarButtonPrimary>
        </Footer>
      </SidebarContainer>
    </>
  );
};
export default withRouter(Sidebar);
