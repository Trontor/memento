import { BackButton, BackToView, SettingsHeader } from "ui/Navigation";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, { useState } from "react";
import AccountSettingsView from "./AccountSettingsView";
import { Container } from "ui/Helpers";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import ProfileSettingsView from "./ProfileSettingsView";
import { useQuery } from "@apollo/react-hooks";

export default function Settings(props) {
  const menuTabs = ["Profile", "Account"];
  const [currentTabIndex, setTabIndex] = useState(0);
  const userId = props.match.params.id;

  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { id: userId },
  });

  let user = {};

  if (data && data.currentUser) {
    user = data.currentUser;
  }

  let tabComponent = null;
  switch (menuTabs[currentTabIndex]) {
    case "Profile":
      tabComponent = <ProfileSettingsView />;
      break;
    case "Account":
      tabComponent = <AccountSettingsView />;
      break;
    default:
      break;
  }

  return (
    <Container>
      <SettingsHeader>
        <BackToView
          onClick={() => props.history.push("/profile/" + user.userId)}
        >
          <BackButton />
        </BackToView>
        <Header center>My Settings</Header>
        <div></div>
      </SettingsHeader>
      <MenuContainer>
        {menuTabs.map((tab, idx) => (
          <MenuTabs
            key={tab}
            active={currentTabIndex === idx}
            onClick={() => setTabIndex(idx)}
          >
            {tab}
          </MenuTabs>
        ))}
      </MenuContainer>
      {tabComponent}
    </Container>
  );
}
