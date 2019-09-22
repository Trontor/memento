import React, { useState } from "react";
import {
  SettingsContainer,
  SectionWrapper,
  AccountButton,
  EditAccountButton,
  CancelButton,
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel, DefaultInput } from "ui/Forms";

export default function SettingsAccount() {
  const [editEmail, setEmailWrapper] = useState(false);
  const editEmailHandler = () => setEmailWrapper(!editEmail);
  const [editPassword, setPasswordWrapper] = useState(false);
  const editPasswordHandler = () => setPasswordWrapper(!editPassword);

  let defaultEmail = <DefaultInput>test123@gmail.com</DefaultInput>;
  if (editEmail) {
    defaultEmail = (
      <InputField placeholder="Email Address..." value="test123@gmail.com" />
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
