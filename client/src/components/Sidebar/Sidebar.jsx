import {
  CloseMenu,
  FamilyListSection,
  MenuSection,
  NewFamilyGroup,
  SidebarContainer,
  SidebarHeader,
  SignOutButton,
  TextList,
  UserAvatar,
  UserDisplay,
  UserName,
} from "./SidebarStyles";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import GET_CURRENT_USER from "queries/GetCurrentUser";
import { GET_USER_FAMILIES } from "queries/UserQueries";
import { Logo } from "ui/Logos";
import { Spinner } from "ui/Loaders";
import { useQuery } from "@apollo/react-hooks";

const Sidebar = props => {
  const history = useHistory();
  const location = useLocation();
  const [families, setFamilies] = useState(null);
  const [user, setUser] = useState({});
  useQuery(GET_CURRENT_USER, {
    onCompleted: data => {
      if (data && data.currentUser) {
        setUser(data.currentUser);
      }
    },
  });

  const signOut = () => {
    localStorage.removeItem("AUTH-TOKEN");
    history.push("/login");
  };
  // Check for a authentication token, if not - redirect to the login page
  if (!localStorage.getItem("AUTH-TOKEN")) {
    signOut();
  }
  const { refetch } = useQuery(GET_USER_FAMILIES, {
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
      <UserDisplay onClick={() => history.push("/profile/" + user.userId)}>
        <UserAvatar>
          {!user.imageUrl ? (
            <i class="fas fa-user-circle"></i>
          ) : (
            <img src={user.imageUrl} alt="profile_image"></img>
          )}
        </UserAvatar>
        <div>
          <UserName>{user.firstName}</UserName>
        </div>
      </UserDisplay>
      <FamilyListSection>
        {families && <h3>My Families</h3>}
        {!families ? (
          <Spinner />
        ) : (
          families.map(family => (
            <TextList key={family.familyId}>
              <span onClick={() => history.push(`/family/${family.familyId}`)}>
                {family.name}
              </span>
            </TextList>
          ))
        )}
        <NewFamilyGroup
          data-cy="new-family"
          onClick={() => history.push("/family/new")}
        >
          New Family group
        </NewFamilyGroup>
      </FamilyListSection>
      <MenuSection>
        <TextList>
          <i class="fas fa-user-plus"></i>
          <span
            data-cy="invite"
            href="#"
            onClick={() => history.push("/invite")}
          >
            Invite
          </span>
        </TextList>
      </MenuSection>
      <MenuSection>
        <TextList>
          <i class="far fa-paper-plane"></i>
          <span href="#" onClick={() => history.push("/mementos")}>
            View my Mementos
          </span>
        </TextList>
        <TextList>
          <i class="far fa-bookmark"></i>
          <span href="#" onClick={() => history.push("/bookmarks")}>
            Bookmarks
          </span>
        </TextList>
      </MenuSection>
      <MenuSection>
        <TextList>
          <i class="fas fa-pencil-alt"></i>
          <span
            data-cy="edit-account"
            href="#"
            onClick={() => history.push("/settings")}
          >
            Edit profile & account
          </span>
        </TextList>
      </MenuSection>
      <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
    </SidebarContainer>
  );
};
export default Sidebar;
