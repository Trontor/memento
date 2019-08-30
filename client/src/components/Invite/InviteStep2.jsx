import React, { useState } from "react";
import { InstructionLabel, FormSection, InputField, HelpText } from 'ui/Forms';

export default function InviteStep2({ currentStep, addEmails, inviteEmails}) {

  if (currentStep !== 2) {
    return null
  }

  return(
    <FormSection>
      <InstructionLabel>Enter the email addresses of family members you would like to invite.</InstructionLabel>
      <InputField
        type="text"
        placeholder="name@example.com"/>
    </FormSection>
  );
}
