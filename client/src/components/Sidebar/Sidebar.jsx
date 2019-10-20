import {
  CloseMenu,
  FamilyAvatar,
  FamilyList,
  FamilyListSection,
  MenuSection,
  NewFamilyGroup,
  SidebarContainer,
  SidebarHeader,
  SignOutButton,
  TextList,
  UserAvatar,
  UserDisplay,
  UserName
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

  console.log(families)

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
            <i className="fas fa-user-circle"></i>
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
            <FamilyLink
              key={family.familyId}
              name="family"
              to={`/family/${family.familyId}`}
              familyIcon={family.imageUrl}
              familyColour={family.colour}
            >
              {family.name}
            </FamilyLink>
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
        <SidebarLink icon="fas fa-user-plus" name="invite" to="/invite">
          Invite
        </SidebarLink>
        <SidebarLink icon="far fa-envelope-open" exact to="/invite/accept">
          Join a Family
        </SidebarLink>
      </MenuSection>
      <MenuSection>
        <SidebarLink icon="far fa-paper-plane" name="mementos" to="/mementos">
          View My Mementos
        </SidebarLink>
        <SidebarLink icon="far fa-bookmark" name="bookmarks" to="/bookmarks">
          Bookmarks
        </SidebarLink>
      </MenuSection>
      <MenuSection>
        <SidebarLink
          icon="fas fa-pencil-alt"
          name="edit-account"
          to="/settings"
        >
          Edit profile & account
        </SidebarLink>
      </MenuSection>
      <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
    </SidebarContainer>
  );
};

const SidebarLink = ({ to, name, icon, children }) => {
  return (
    <TextList to={to}>
      {icon && <i className={icon}></i>}
      <span data-cy={name} href="#">
        {children}
      </span>
    </TextList>
  );
};

const FamilyLink = ({to, name, familyIcon, children, familyColour}) => {
  return (
    <FamilyList
      to={to}
      familyColour={familyColour}>
      <FamilyAvatar familyColour={familyColour}>
      {
        familyIcon ?
        <img src={familyIcon} alt={""}/>
        :
        familyIcon === null ?
        <img src="https://image.flaticon.com/icons/svg/1999/1999109.svg" alt={""}/>
        :
        null
      }
    </FamilyAvatar>
    <span data-cy={name} href="#">
      {children}
    </span>
  </FamilyList>
  );
}

export default Sidebar;
