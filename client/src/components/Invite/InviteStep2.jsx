import React from "react";
import { InstructionLabel, FormSection, InputField } from 'ui/Forms';
import { FamilyGroupName, EmailsList } from './InviteStyles';
import { AddButton } from 'ui/Buttons';

export default function InviteStep2({ currentStep, addEmail, inviteEmails, selected, handleChange}) {

  if (currentStep !== 2) {
    return null
  }

  return(
    <FormSection>
      <InstructionLabel>Enter the email addresses of family members you would like to invite to <FamilyGroupName>{selected}</FamilyGroupName> :</InstructionLabel>

      <EmailsList>
        {
          inviteEmails.map((email, idx) => (
            <InputField
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={e => handleChange(idx, e)}
            />
          ))
        }
      </EmailsList>

      <AddButton
        text="Add another"
        onClick={() => addEmail("")}>
        <i className="fa fa-plus"></i>
      </AddButton>

    </FormSection>
  );
}
