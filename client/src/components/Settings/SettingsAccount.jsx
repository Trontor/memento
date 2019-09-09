import React, { useState } from "react";
import {
  SettingsContainer,
  SectionWrapper,
  AccountButton,
  EditAccountButton,
  CancelButton
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel } from "ui/Forms";
//import { ButtonSecondary } from "ui/Buttons";

export default function SettingsAccount({ menuClick }) {
  const [editEmail, setEmailWrapper] = useState(false);
  const editEmailHandler = () => setEmailWrapper(true);
  const closeEmailHandler = () => setEmailWrapper(false);
  const [editPassword, setPasswordWrapper] = useState(false);
  const editPasswordHandler = () => setPasswordWrapper(true);
  const closePasswordHandler = () => setPasswordWrapper(false);

  return (
    <SettingsContainer menuClick={menuClick.account}>
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
            onClick={closeEmailHandler}
            editClick={editEmail}
          />
        </InputLabel>
        <InputField placeholder="Email Address..." value="test123" />
        <SectionWrapper editClick={editEmail}>
          <AccountButton onClick={closeEmailHandler}>
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
            onClick={closePasswordHandler}
            editClick={editPassword}
          />
        </InputLabel>
        <InputField type="password" value="123" />
        <SectionWrapper editClick={editPassword}>
          <InputField type="password" placeholder="New Password" />
          <InputField type="password" placeholder="Confirm Password" />
          <AccountButton onClick={closePasswordHandler}>
            Update Password{" "}
          </AccountButton>
        </SectionWrapper>
      </FormSection>
    </SettingsContainer>
  );
}
