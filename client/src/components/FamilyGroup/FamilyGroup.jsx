import {
  DetailsWrapper,
  FamilyContainer,
  FamilyHeader,
  FamilyImg,
  FamilyLayout,
  GroupDetails,
  MemberRow,
  Menu,
  ProfilePhotoContainer,
  SettingsButton,
  SideMenu,
  SideMenuSectionContainer,
  SideMenuSectionHeader,
  TabComponent,
  UploadButton
} from "./FamilyGroupStyles";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, {useState} from "react";

import { FamilyProfileContainer } from "./FamilyGroupStyles";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import MembersViewer from "./MembersViewer";
import MementosViewer from "./MementosViewer";
import TagsViewer from "./TagsViewer";
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroup(props) {
  const menuTabs = ["Mementos", "Members", "Tags"];
  const [currentTabIndex, setTabIndex] = useState(0)
  const familyId = props.match.params.id;
  const { data, loading, /* error */ } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
  });

  if (loading) {
    return <JollyLoader />;
  }

  let familyName, members;

  if (data) {
    familyName = data.family.name;
    members = data.family.members;
    console.log(members);
  }

  let tabComponent = null;
  switch(menuTabs[currentTabIndex]){
    case "Mementos":
      tabComponent = <MementosViewer/>
      break;
    case "Members":
      tabComponent = <MembersViewer members={members}/>
      break;
    case "Tags":
      tabComponent = <TagsViewer/>
      break;
    default:
      break;
  }

  console.log(members)
  return (
    <FamilyContainer>
    <FamilyLayout>
      <div>
        <SideMenu>
          <FamilyProfileContainer>
            <FamilyImg />
            <ProfilePhotoContainer>
              <img
                alt="Family Group Photo"
                src="https://images.unsplash.com/photo-1506827155776-53ce0b5d56b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
              />
            </ProfilePhotoContainer>
            <FamilyHeader>
              <div></div>
              <h1>{familyName}</h1>
              <SettingsButton onClick={() => props.history.push(familyId + "/settings")}/>
              {/* <UploadButton onClick={() => props.history.push(familyId + "/memento/new")}>
                Add a Memento
              </UploadButton> */}
              <DetailsWrapper>
                <GroupDetails>
                  <i class="far fa-paper-plane"></i>
                  3 mementos
                </GroupDetails>
                <GroupDetails>
                  <i class="fas fa-users"></i>
                  4 members
                </GroupDetails>
              </DetailsWrapper>
            </FamilyHeader>
          </FamilyProfileContainer>
          <SideMenuSectionContainer>
            <SideMenuSectionHeader>
              <h2>
                Members
              </h2>
            </SideMenuSectionHeader>
            {members.map(member => (
              <MemberRow admin>
                <i class="fas fa-user-circle"></i>
                <div>
                  <span onClick={() => props.history.push("/profile/" + member.userId)}>
                    {member.firstName} {member.lastName}
                  </span>
                  <span>Admin</span>
                </div>
              </MemberRow>
            ))}
          </SideMenuSectionContainer>
        </SideMenu>
        <Menu>
          <MenuContainer>
            {menuTabs.map((tab, idx) => (
              <MenuTabs active={currentTabIndex === idx} onClick={()=> setTabIndex(idx)}>{tab}</MenuTabs>
            ))}
          </MenuContainer>
        </Menu>
        </div>
        <TabComponent>
          {tabComponent}
        </TabComponent>
    </FamilyLayout>
    </FamilyContainer>
  );
}