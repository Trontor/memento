import { BackButton, BackToView, SettingsHeader } from "ui/Navigation";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, { useState } from "react";
import AccountSettingsView from "./AccountSettingsView";
import { Container } from "ui/Helpers";
// import { useQuery } from "@apollo/react-hooks";
// import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import ProfileSettingsView from "./ProfileSettingsView";

export default function Settings(props) {
  const menuTabs = ["Profile", "Account"];
  const [currentTabIndex, setTabIndex] = useState(0);

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
        <BackToView>
          <BackButton onClick={() => props.history.goBack()} />
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
