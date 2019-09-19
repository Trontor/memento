import { CenterText, Container } from "ui/Helpers";
import { MenuContainer, MenuTabs } from "ui/Navigation";
import React, { useState } from "react";

import { Header } from "ui/Typography";
import SettingsAccount from "./SettingsAccount";
import SettingsProfile from "./SettingsProfile";

export default function Settings() {
  const menuTabs = ["Profile", "Account"];
  const [currentTabIndex, setTabIndex] = useState(0);

  let tabComponent = null;
  switch (menuTabs[currentTabIndex]) {
    case "Profile":
      tabComponent = <SettingsProfile />;
      break;
    case "Account":
      tabComponent = <SettingsAccount />;
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
            active={currentTabIndex == idx}
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
