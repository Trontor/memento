import React from "react";
import { InstructionLabel, FormSection, InputField, FormHelpText, Error } from 'ui/Forms';
import { FamilyGroupName, EmailsList, EmailInvite, DeleteButton } from './InviteStyles';
import { AddButton } from 'ui/Buttons';

export default function InviteStep2({ currentStep, addEmail, deleteEmail, inviteEmails, selected, handleChange, error}) {

  if (currentStep !== 2) {
    return null
  }

  return(
    <FormSection>
      <InstructionLabel>Enter the email addresses of family members you would like to invite to <FamilyGroupName>{selected}</FamilyGroupName> :</InstructionLabel>

      <EmailsList>
        {
          inviteEmails.map((email, idx) => (
            <EmailInvite>
              <InputField
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => handleChange(idx, e)}
              />
              { inviteEmails.length > 1 ?
              <DeleteButton
                onClick={() => deleteEmail(idx)}>
                <i class="fa fa-trash"></i>
              </DeleteButton>
              :
              null
              }
            </EmailInvite>
          ))
        }
        {error && (
          <Error>error</Error>
        )}
      </EmailsList>

      { inviteEmails.length < 10 ?
        <AddButton
          text="Add another"
          onClick={() => addEmail("")}>
          <i className="fa fa-plus"></i>
        </AddButton>
        :
        null
      }
      <FormHelpText>
        You may add up to 10 family members at once.
      </FormHelpText>
    </FormSection>
  );
}
