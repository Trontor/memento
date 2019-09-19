import { HeaderButton, SettingsMenu } from "./SettingsStyles";
import React, { useState } from "react";

import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import SettingsAccount from "./SettingsAccount";
import SettingsProfile from "./SettingsProfile";

export default function Settings() {
  const [settingsMenu, setsettingsMenu] = useState({
    profile: true,
    account: false,
  });

  const settingsOpened = settingsName => {
    if (
      (settingsMenu.profile === true &&
        settingsName.target.value === "profile") ||
      (settingsMenu.account === true &&
        settingsName.target.value === "account")
    ) {
      setsettingsMenu({
        profile: settingsMenu.profile,
        account: settingsMenu.account,
      });
    } else {
      setsettingsMenu({
        profile: !settingsMenu.profile,
        account: !settingsMenu.account,
      });
    }
  };

  return (
    <Container>
      <Header underline>My Settings</Header>
      <SettingsMenu>
        <HeaderButton
          value="profile"
          onClick={settingsOpened}
          menuClick={settingsMenu.profile}
        >
          Profile
        </HeaderButton>
        <HeaderButton
          value="account"
          onClick={settingsOpened}
          menuClick={settingsMenu.account}
        >
          Account
        </HeaderButton>
      </SettingsMenu>
      <SettingsProfile menuClick={settingsMenu} />
      <SettingsAccount menuClick={settingsMenu} />
    </Container>
  );
}
