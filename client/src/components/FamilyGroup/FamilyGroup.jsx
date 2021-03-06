import {
  DetailsWrapper,
  FamilyContainer,
  FamilyHeader,
  FamilyImg,
  FamilyLayout,
  GroupDetails,
  MainViewer,
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
import React, { useEffect, useState } from "react";

import { FamilyProfileContainer } from "./FamilyGroupStyles";
import { GET_MEMENTOS } from "queries/Memento";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import MembersViewer from "./MembersViewer";
import MementosViewer from "./MementosViewer";
import NoMementos from "./NoMementos";
import TagsViewer from "./TagsViewer";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

const defaultTags = [];
const loadingQuotes = [
  "Loading...",
  "Considering a reunion...",
  "Loading mementos...",
  "Analysing heirachy...",
];
export default function FamilyGroup(props) {
  const menuTabs = ["Mementos", "Members", "Tags"];
  const [currentTabIndex, setTabIndex] = useState(0);
  const familyId = props.match.params.id;
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [filterTags, setFilterTags] = useState([]);
  const [mementos, setMementos] = useState(null);
  const [family, setFamily] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const tagsRef = React.createRef();
  useEffect(() => {
    // If there are no mementos, forget about it
    if (!mementos) return;
    // Otherwise, loop through the memebto list and get all the regular tags
    // then flatten the 2D array
    const mementoTags = mementos.map(m => m.tags).flat();
    // and do the same to the detectedLabel tag names
    const detectedTags = mementos
      .map(m => m.detectedLabels.map(l => l.name))
      .flat();
    // Combine the two arrays and make sure the tags are lowercase for
    // consistency
    const allTags = [...mementoTags, ...detectedTags].map(t => t.toLowerCase());
    // Convert to Set and then back to array to remove duplicate tags, sneaky...
    setTagOptions(Array.from(new Set(allTags)));
  }, [mementos]);

  // Query to load the family
  const { loading, error, refetch } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
    fetchPolicy: "cache-and-network",
    pollInterval: 2000,
    onCompleted: data => {
      if (data && data.family) {
        setCurrentUser(data.currentUser);
        setFamily(data.family);
        // console.log("Loaded family...", data.family);
      }
    },
  });

  // Separate query to load the family mementos
  const getMementosQuery = useQuery(GET_MEMENTOS, {
    variables: {
      id: familyId,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      if (data && data.mementos) {
        console.log("Fetched mementos succesfully:", data.mementos);
        setMementos(data.mementos);
      }
    },
  });

  useEffect(() => {
    console.log("Refetching family and mementos..");
    refetch();
    getMementosQuery.refetch();
    // eslint-disable-next-line
  }, [location]);

  if (!family || (!mementos && (loading || getMementosQuery.loading))) {
    return <JollyLoader quotes={loadingQuotes} />;
  }

  if (error) {
    console.log("Error loading data");
  }
  const onUploadMementoClicked = () =>
    props.history.push(familyId + "/memento/new");
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

  const cardTagClicked = tag => {
    selectTag(tag);
    tagsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  let tabComponent = null;
  // Extract this as it is used twice within the file (reduces code duplication)
  const mementoViewerComponent = (
    <MementosViewer
      cardTagClicked={cardTagClicked}
      filterTags={filterTags}
      mementos={mementos}
      familyId={familyId}
      userId={currentUser.userId}
      refreshMementos={getMementosQuery.refetch}
      familyColour={family.colour}
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
          familyColour={family.colour}
        />
      );
      break;
    default:
      break;
  }

  const isAdmin = currentUser.familyRoles.some(
    f => f.familyId === familyId && f.familyRole === "Admin",
  );

  return (
    <FamilyContainer>
      <FamilyLayout>
        <div>
          <SideMenu>
            <FamilyProfileContainer>
              <FamilyImg familyColour={family.colour} />
              {family.imageUrl ? (
                <ProfilePhotoContainer>
                  <img alt="family" src={family.imageUrl} />
                </ProfilePhotoContainer>
              ) : (
                <ProfilePhotoContainer thick>
                  <img
                    svg
                    alt="family"
                    src="https://image.flaticon.com/icons/svg/1999/1999109.svg"
                  />
                </ProfilePhotoContainer>
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
                    <i className="far fa-clock"></i>
                    Created on{" "}
                    {moment
                      .utc(family.createdAt)
                      .local()
                      .format("Do MMM YYYY")}
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Mementos */}
                    <i className="far fa-paper-plane"></i>
                    {mementos ? mementos.length : "~"} mementos
                  </GroupDetails>
                  <GroupDetails>
                    {/* Number of Members */}
                    <i className="fas fa-users"></i>
                    {family ? family.members.length : "~"} members
                  </GroupDetails>
                </DetailsWrapper>
              </FamilyHeader>
              <Options>
                {/* Upload Button */}
                <UploadButton
                  familyColour={family.colour}
                  onClick={onUploadMementoClicked}
                >
                  <i className="fas fa-feather-alt"></i>
                  <span>Add a Memento</span>
                </UploadButton>
                {/* Settings Button */}
                {isAdmin && (
                  <SettingsButton
                    familyColour={family.colour}
                    onClick={() => props.history.push(familyId + "/settings")}
                  >
                    <i className="fas fa-cog"></i>
                  </SettingsButton>
                )}
              </Options>
            </FamilyProfileContainer>

            <SideMenuSectionContainer>
              {/* Members */}
              <SideMenuSectionHeader>
                <h2>Members</h2>
              </SideMenuSectionHeader>
              <MembersViewer members={family.members} familyId={familyId} />
            </SideMenuSectionContainer>

            <SideMenuSectionContainer ref={tagsRef}>
              {/* Tags */}
              <SideMenuSectionHeader>
                <h2>
                  Tags
                  {filterTags && filterTags.length > 0 && (
                    <span style={{ fontWeight: 200 }}>
                      {" "}
                      ({filterTags.length} selected)
                    </span>
                  )}
                </h2>
              </SideMenuSectionHeader>
              {!tagOptions.length && <TagRow>No Tags</TagRow>}
              {tagOptions.sort().map(tag => (
                <TagRow
                  key={tag}
                  onClick={() => selectTag(tag)}
                  selected={filterTags.includes(tag)}
                  familyColour={family.colour}
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
                  key={idx}
                  active={currentTabIndex === idx}
                  onClick={() => setTabIndex(idx)}
                  familyColour={family.colour}
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
            {mementos && mementos.length === 0 && (
              <NoMementos
                familyColour={family.colour}
                onClick={onUploadMementoClicked}
              />
            )}
            {mementos && mementos.length !== 0 && mementoViewerComponent}
          </MainViewer>
        </div>
      </FamilyLayout>
    </FamilyContainer>
  );
}
