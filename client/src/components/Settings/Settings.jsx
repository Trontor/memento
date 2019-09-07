import React, { useState } from "react";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { SettingsHeader, HeaderButton } from "./SettingsStyles";
import SettingsProfile from "./SettingsProfile";

export default function Settings() {
  const [settingsHeader, setSettingsHeader] = useState({
    profile: true,
    account: false
  });

  const settingsOpened = settingsName => {
    if (
      (settingsHeader.profile === true &&
        settingsName.target.value === "profile") ||
      (settingsHeader.account === true &&
        settingsName.target.value === "account")
    ) {
      setSettingsHeader({
        profile: settingsHeader.profile,
        account: settingsHeader.account
      });
    } else {
      setSettingsHeader({
        profile: !settingsHeader.profile,
        account: !settingsHeader.account
      });
    }
  };

  return (
    <Container>
      <Header underline>My Settings</Header>
      <SettingsHeader>
        <HeaderButton
          value="profile"
          onClick={settingsOpened}
          menuClick={settingsHeader.profile}
        >
          Profile
        </HeaderButton>
        <HeaderButton
          value="account"
          onClick={settingsOpened}
          menuClick={settingsHeader.account}
        >
          Account
        </HeaderButton>
      </SettingsHeader>
      <SettingsProfile menuClick={settingsHeader} />
    </Container>
  );
}
