import React, { useState } from "react";
import { Formik } from "formik";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { SettingsHeader, HeaderButton } from "./SettingsStyles";
import SettingsProfile from "./SettingsProfile";
import SettingsAccount from "./SettingsAccount";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function Settings() {
  const { data } = useQuery(GET_CURRENT_USER);

  let defaultValues = {
    firstName: "",
    lastName: "",
    email: "" //email and password is not defined
  };

  if (data && data.currentUser) {
    defaultValues.firstName = data.currentUser.firstName;
    defaultValues.lastName = data.currentUser.lastName;
    defaultValues.email = data.currentUser.email;
  }

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
    <Formik
      render={props => (
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
          <SettingsProfile
            menuClick={settingsHeader}
            currentUser={defaultValues}
          />
          <SettingsAccount
            menuClick={settingsHeader}
            currentUser={defaultValues}
          />
        </Container>
      )}
    />
  );
}
