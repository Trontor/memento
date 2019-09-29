import {
  FamilyHeader,
  FamilyImg,
  SettingsButton
} from "./FamilyGroupStyles";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, {useState} from "react";

import { Container } from "ui/Helpers";
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

  return (
    <>
      <FamilyImg />
      <FamilyHeader>
        <div></div>
        <h1>{familyName}</h1>
        <SettingsButton onClick={() => props.history.push(familyId + "/settings")}/>
      </FamilyHeader>
      <MenuContainer>
        {menuTabs.map((tab, idx) => (
          <MenuTabs active={currentTabIndex === idx} onClick={()=> setTabIndex(idx)}>{tab}</MenuTabs>
        ))}
      </MenuContainer>
      {tabComponent}
      <Container noNav></Container>
    </>
  );
}