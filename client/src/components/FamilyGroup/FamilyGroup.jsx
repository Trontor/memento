import {
  DetailsWrapper,
  FamilyContainer,
  FamilyHeader,
  FamilyImg,
  FamilyLayout,
  GroupDetails,
  MainViewer,
  MemberRow,
  Menu,
  Options,
  ProfilePhotoContainer,
  SettingsButton,
  SideMenu,
  SideMenuSectionContainer,
  SideMenuSectionHeader,
  TabComponent,
  TagRow,
  UploadButton,
} from "./FamilyGroupStyles";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, { useState } from "react";

import { FamilyProfileContainer } from "./FamilyGroupStyles";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import MembersViewer from "./MembersViewer";
import MementosViewer from "./MementosViewer";
import TagsViewer from "./TagsViewer";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroup(props) {
  const menuTabs = ["Mementos", "Members", "Tags"];
  const [currentTabIndex, setTabIndex] = useState(0);
  const familyId = props.match.params.id;
  const [mementoTags, setMementoTags] = useState([]);
  const [family, setFamily] = useState(null);

  const { data, loading, error } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
    onCompleted: data => {
      if (data && data.family) {
        setFamily(data.family);
      }
    },
  });

  if (loading || !family) {
    return <JollyLoader />;
  }

  // let familyName, members, colour;

  // if (data) {
  //   familyName = data.family.name;
  //   members = data.family.members;
  //   colour = data.family.colour;
  //   console.log(members);
  //   console.log(colour);
  // }

  if (error) {
    console.log("Error loading data");
  }

  const tags = [
    "recipes",
    "painting",
    "stuffed toys",
    "cars",
    "jewellery",
    "photographs",
    "clothing",
    "family",
    "blanket",
    "food",
  ];

  const selectTag = tag => {
    if (mementoTags.includes(tag)) {
      const tags = [...mementoTags];
      const tagIndex = tags.indexOf(tag);
      if (tagIndex !== -1) {
        tags.splice(tagIndex, 1);
        setMementoTags(tags);
      }
    } else {
      setMementoTags([...mementoTags, tag]);
    }
  };

  let tabComponent = null;
  switch (menuTabs[currentTabIndex]) {
    case "Mementos":
      tabComponent = <MementosViewer familyId={familyId} themeColour={family.colour} />;
      break;
    case "Members":
      tabComponent = <MembersViewer members={family.members} />;
      break;
    case "Tags":
      tabComponent = (
        <TagsViewer
          tags={tags}
          selectTag={selectTag}
          mementoTags={mementoTags}
          setMementoTags={setMementoTags}
        />
      );
      break;
    default:
      break;
  }
  console.log("Loaded Family: ", family);
  return (
    <FamilyContainer>
      <FamilyLayout>
        <div>
          <SideMenu>
            <FamilyProfileContainer>
              <FamilyImg />
              <ProfilePhotoContainer>
                <img
                  alt="family"
                  src="https://images.unsplash.com/photo-1506827155776-53ce0b5d56b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                />
              </ProfilePhotoContainer>
              <FamilyHeader>
                <div></div> {/* Empty div to center title */}
                <div></div> {/* Empty div to center title */}
                {/* Family Name */}
                <h1>{family.name}</h1>
                <div></div>
                <DetailsWrapper>
                  <GroupDetails>
                    {/* Date of Group Creation */}
                    <i class="far fa-clock"></i>
                    Created on {moment(family.createdAt).format("Do MMM, YYYY")}
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Mementos */}
                    <i class="far fa-paper-plane"></i>3 mementos
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Members */}
                    <i class="fas fa-users"></i>4 members
                  </GroupDetails>
                </DetailsWrapper>
              </FamilyHeader>
              <Options>
                {/* Upload Button */}
                <UploadButton
                  onClick={() => props.history.push(familyId + "/memento/new")}
                >
                  <i class="fas fa-feather-alt"></i>
                  <span>Add a Memento</span>
                </UploadButton>
                {/* Settings Button */}
                <SettingsButton
                  onClick={() => props.history.push(familyId + "/settings")}
                >
                  <i class="fas fa-cog"></i>
                </SettingsButton>
              </Options>
            </FamilyProfileContainer>

            <SideMenuSectionContainer>
              {/* Members */}
              <SideMenuSectionHeader>
                <h2>Members</h2>
              </SideMenuSectionHeader>
              {family.members.map(member => (
                <MemberRow admin>
                  <i class="fas fa-user-circle"></i>
                  <div>
                    <span
                      onClick={() =>
                        props.history.push("/profile/" + member.userId)
                      }
                    >
                      {member.firstName} {member.lastName}
                    </span>
                    <span>Admin</span>
                  </div>
                </MemberRow>
              ))}
            </SideMenuSectionContainer>

            <SideMenuSectionContainer>
              {/* Tags */}
              <SideMenuSectionHeader>
                <h2>Tags</h2>
              </SideMenuSectionHeader>
              {tags.sort().map(tag => (
                <TagRow
                  onClick={() => selectTag(tag)}
                  selected={mementoTags.includes(tag)}
                >
                  <span>{tag}</span>
                </TagRow>
              ))}
            </SideMenuSectionContainer>
          </SideMenu>

          <Menu>
            <MenuContainer>
              {menuTabs.map((tab, idx) => (
                <MenuTabs
                  active={currentTabIndex === idx}
                  onClick={() => setTabIndex(idx)}
                >
                  {tab}
                </MenuTabs>
              ))}
            </MenuContainer>
          </Menu>
        </div>
        <div>
          {/* Mobile */}
          <TabComponent>{tabComponent}</TabComponent>
          {/* Desktop */}
          <MainViewer>
            <MementosViewer familyId={familyId} />
          </MainViewer>
        </div>
      </FamilyLayout>
    </FamilyContainer>
  );
}
