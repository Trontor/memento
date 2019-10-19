import {
  AccountButton,
  SectionWrapper,
  SettingsContainer,
} from "./SettingsStyles";
import { DefaultInput, FormSection, InputField } from "ui/Forms";
import React, { useState } from "react";

import EditInput from "components/EditInput/EditInput";

export default function SettingsAccount() {
  const [editPassword, setPasswordWrapper] = useState(false);
  const editPasswordHandler = () => setPasswordWrapper(!editPassword);

  let defaultPassword = <DefaultInput>******</DefaultInput>;
  if (editPassword) {
    defaultPassword = <InputField type="password" value="123" />;
  }

  return (
    <SettingsContainer>
      <FormSection>
        <EditInput
          value="test123@gmail.com"
          inputLabel="Email Address"
        />
      </FormSection>

      <FormSection>
        {defaultPassword}
        <SectionWrapper editClick={editPassword}>
          <InputField type="password" placeholder="New Password" />
          <InputField type="password" placeholder="Confirm Password" />
          <AccountButton onClick={editPasswordHandler}>
            Update Password
          </AccountButton>
        </SectionWrapper>
      </FormSection>

      <FormSection>
        <EditInput
          value="********"
          inputLabel="Password"
          password
        />
      </FormSection>

    </SettingsContainer>
  );
}
