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
  TextList,
} from "./SidebarStyles";
import { EditProfile, Invite, NewArtefact, View, Bookmarks } from "ui/Buttons";

import { GET_USER_FAMILIES } from "queries/UserQueries";
import { Logo } from "ui/Logos";
import React, { useEffect, useState } from "react";
import { Spinner } from "ui/Loaders";
import { useQuery } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";

const Sidebar = props => {
  const history = useHistory();
  const location = useLocation();
  const [families, setFamilies] = useState(null);

  const signOut = () => {
    localStorage.removeItem("AUTH-TOKEN");
    history.push("/login");
  };
  // Check for a authentication token, if not - redirect to the login page
  if (!localStorage.getItem("AUTH-TOKEN")) {
    signOut();
  }

  const { loading, refetch } = useQuery(GET_USER_FAMILIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      setFamilies(data.currentUser.families);
    },
  });

  const iconSize = "20px";

  useEffect(() => {
    console.log("Refreshing sidebar...");
    refetch();
  }, [refetch, location]);

  return (
    <SidebarContainer isOpen={props.sidebarOpen}>
      <SidebarHeader>
        <Logo pointer size="small" onClick={() => history.push("/dashboard")} />
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
        {families && <h3>My Families</h3>}
        {!families ? (
          <Spinner />
        ) : (
          families.map(family => (
            <TextList key={family.familyId}>
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
        <TextList>
          <Bookmarks size={iconSize} />
          <a href={`/bookmarks`}>Bookmarks</a>
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
export default Sidebar;
