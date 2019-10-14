import {
  AccountButton,
  CancelButton,
  EditAccountButton,
  SectionWrapper,
  SettingsContainer,
} from "./SettingsStyles";
import { DefaultInput, FormSection, InputField, InputLabel } from "ui/Forms";
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
        <EditInput value="test123@gmail.com" inputLabel="Email Address" />
      </FormSection>

      <FormSection>
        <EditInput value="********" inputLabel="Password" password />
      </FormSection>
    </SettingsContainer>
  );
}
