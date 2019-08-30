import React, { useState } from "react";
import { InstructionLabel, FormHelpText, FormSection } from 'ui/Forms';
import { ButtonPrimary } from 'ui/Buttons';

export default function InviteStep2() {
  const [inviteEmails, setInviteEmails] = useState([]);

  return(
    <FormSection>
      <InstructionLabel>Who would you like to invite?</InstructionLabel>
    </FormSection>
  );
}
