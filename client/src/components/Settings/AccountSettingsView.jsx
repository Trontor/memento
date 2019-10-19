import { SettingsContainer } from "./SettingsStyles";
import { FormSection } from "ui/Forms";
import React from "react";
import EditInput from "components/EditInput/EditInput";

export default function SettingsAccount() {
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
