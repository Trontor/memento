import React from "react";
import { InstructionLabel, FormSection, InputField } from 'ui/Forms';
import { FamilyGroupName } from './InviteStyles';

export default function InviteStep2({ currentStep, addEmails, inviteEmails, selected}) {

  if (currentStep !== 2) {
    return null
  }

  return(
    <FormSection>
      <InstructionLabel>Enter the email addresses of family members you would like to invite to <FamilyGroupName>{selected}</FamilyGroupName> :</InstructionLabel>
      <InputField
        type="text"
        placeholder="name@example.com"/>
    </FormSection>
  );
}
