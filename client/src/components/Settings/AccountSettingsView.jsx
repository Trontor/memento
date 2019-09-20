import React, { useState } from "react";
import {
  SettingsContainer,
  SectionWrapper,
  AccountButton,
  EditAccountButton,
  CancelButton,
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel, DefaultInput } from "ui/Forms";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function SettingsAccount() {
  const [editEmail, setEmailWrapper] = useState(false);
  const editEmailHandler = () => setEmailWrapper(!editEmail);
  const [editPassword, setPasswordWrapper] = useState(false);
  const editPasswordHandler = () => setPasswordWrapper(!editPassword);

  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  let user = {};

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
  }

  let defaultEmail = <DefaultInput>{user.email}</DefaultInput>;
  if (editEmail) {
    defaultEmail = (
      <InputField placeholder="Email Address..." value={user.email} />
    );
  }

  let defaultPassword = <DefaultInput>******</DefaultInput>;
  if (editPassword) {
    defaultPassword = <InputField type="password" value="123" />;
  }

  return (
    <SettingsContainer>
      <FormSection>
        <InputLabel>
          Email Address{" "}
          <EditAccountButton
            size="25px"
            onClick={editEmailHandler}
            editClick={editEmail}
          />
          <CancelButton
            size="25px"
            onClick={editEmailHandler}
            editClick={editEmail}
          />
        </InputLabel>
        {defaultEmail}
        <SectionWrapper editClick={editEmail}>
          <AccountButton onClick={editEmailHandler}>
            Update Email{" "}
          </AccountButton>
        </SectionWrapper>
      </FormSection>

      <FormSection>
        <InputLabel>
          Password{" "}
          <EditAccountButton
            size="25px"
            onClick={editPasswordHandler}
            editClick={editPassword}
          />
          <CancelButton
            size="25px"
            onClick={editPasswordHandler}
            editClick={editPassword}
          />
        </InputLabel>
        {defaultPassword}
        <SectionWrapper editClick={editPassword}>
          <InputField type="password" placeholder="New Password" />
          <InputField type="password" placeholder="Confirm Password" />
          <AccountButton onClick={editPasswordHandler}>
            Update Password{" "}
          </AccountButton>
        </SectionWrapper>
      </FormSection>
    </SettingsContainer>
  );
}
