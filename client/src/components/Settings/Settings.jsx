import { CenterText, Container } from "ui/Helpers";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, { useState } from "react";

import AccountSettingsView from "./AccountSettingsView";
import { Header } from "ui/Typography";
import ProfileSettingsView from "./ProfileSettingsView";

export default function Settings() {
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
      <CenterText>
        <Header center>My Settings</Header>
      </CenterText>
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
