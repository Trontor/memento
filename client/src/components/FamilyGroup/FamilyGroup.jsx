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
import React, { useState, useEffect } from "react";

import { FamilyProfileContainer } from "./FamilyGroupStyles";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import MembersViewer from "./MembersViewer";
import MementosViewer from "./MementosViewer";
import TagsViewer from "./TagsViewer";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";

const defaultTags = [
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

export default function FamilyGroup(props) {
  const menuTabs = ["Mementos", "Members", "Tags"];
  const [currentTabIndex, setTabIndex] = useState(0);
  const familyId = props.match.params.id;
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [filterTags, setFilterTags] = useState([]);
  const [mementos, setMementos] = useState(null);
  const [family, setFamily] = useState(null);

  useEffect(() => {
    if (!mementos) return;
    const mementoTags = mementos.map(m => m.tags).flat();
    const detectedTags = mementos
      .map(m => m.detectedLabels.map(l => l.name))
      .flat();
    console.log("Memento Tags:", mementoTags, "Detected Tags:", detectedTags);
    const allTags = [...mementoTags, ...detectedTags].map(t => t.toLowerCase());
    // Convert to Set and back to array to remove duplicate tags, sneaky...
    setTagOptions(Array.from(new Set(allTags)));
  }, [mementos]);
  const { loading, error } = useQuery(LOAD_FAMILY, {
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

  const onLoadedMementos = loadedMementos => setMementos(loadedMementos);
  // Handles when a tag is selected on the sidebar
  const selectTag = tag => {
    // Check if the tag has already been selected
    if (filterTags.includes(tag)) {
      // If the tags has been selected,
      setFilterTags(filterTags.filter(t => t !== tag));
    } else {
      // Otherwise, add the tag to the list
      setFilterTags([...filterTags, tag]);
    }
  };

  let tabComponent = null;
  // Extract this as it is used twice within the file (reduces code duplication)
  const mementoViewerComponent = (
    <MementosViewer
      filterTags={filterTags}
      onLoadedMementos={onLoadedMementos}
      familyId={familyId}
    />
  );
  switch (menuTabs[currentTabIndex]) {
    case "Mementos":
      tabComponent = mementoViewerComponent;
      break;
    case "Members":
      tabComponent = <MembersViewer members={family.members} />;
      break;
    case "Tags":
      tabComponent = (
        <TagsViewer
          tags={tagOptions}
          selectTag={selectTag}
          mementoTags={filterTags}
          setMementoTags={setFilterTags}
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
              {family.imageUrl && (
                <>
                  <FamilyImg />
                  <ProfilePhotoContainer>
                    <img alt="family" src={family.imageUrl} />
                  </ProfilePhotoContainer>
                </>
              )}
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
                    Created on the{" "}
                    {moment(family.createdAt).format("Do MMM, YYYY")}
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Mementos */}
                    <i class="far fa-paper-plane"></i>
                    {mementos ? mementos.length : "~"} mementos
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Members */}
                    <i class="fas fa-users"></i>
                    {family ? family.members.length : "~"} members
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
                <MemberRow
                  admin={member.familyRoles.some(
                    r => r.id == familyId && r.role.toLowerCase() == "admin",
                  )}
                >
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={`${member.firstName}'s avatar`}
                    />
                  ) : (
                    <i class="fas fa-user-circle"></i>
                  )}
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
              {!tagOptions.length && <TagRow>No Tags</TagRow>}
              {tagOptions.sort().map(tag => (
                <TagRow
                  onClick={() => selectTag(tag)}
                  selected={filterTags.includes(tag)}
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
          <MainViewer>{mementoViewerComponent}</MainViewer>
        </div>
      </FamilyLayout>
    </FamilyContainer>
  );
}
