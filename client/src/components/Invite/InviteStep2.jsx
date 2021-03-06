import React from "react";
import {
  InstructionLabel,
  FormSection,
  InputField,
  FormHelpText,
} from "ui/Forms";
import {
  FamilyGroupName,
  EmailsList,
  EmailInvite,
  DeleteButton,
} from "./InviteStyles";
import { AddButton } from "ui/Buttons";

export default function InviteStep2({
  currentStep,
  addEmail,
  deleteEmail,
  inviteEmails,
  selected,
  handleChange,
}) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <FormSection>
      {/* Email Addresses for Invite */}
      <InstructionLabel>
        Enter the email addresses of family members you would like to invite to{" "}
        <FamilyGroupName>{selected.name}</FamilyGroupName> :
      </InstructionLabel>
      <EmailsList>
        {inviteEmails.map((email, idx) => (
          <>
            <EmailInvite>
              <InputField
                type="email"
                placeholder="name@example.com"
                value={email.email}
                onChange={e => handleChange(idx, e)}
              />
              {inviteEmails.length > 1 && (
                <DeleteButton onClick={() => deleteEmail(idx)}>
                  <i className="fa fa-trash"></i>
                </DeleteButton>
              )}
            </EmailInvite>
          </>
        ))}
      </EmailsList>

      {/* Add a max of 10 email addresses at once */}
      {inviteEmails.length < 10 && (
        <AddButton
          text="Add another"
          onClick={() => addEmail({ email: "", valid: false })}
        >
          <i className="fa fa-plus"></i>
        </AddButton>
      )}
      <FormHelpText>You may add up to 10 family members at once.</FormHelpText>
    </FormSection>
  );
}
