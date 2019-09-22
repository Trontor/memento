import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import React, { useState } from "react";

import { AlignRight } from "ui/Helpers";
import { Container } from "ui/Helpers";
import { FormNav } from "ui/Forms";
import { Formik } from "formik";
import { Header } from "ui/Typography";
import { INVITE_LIST, INVITE_BY_EMAIL } from "mutations/Invite";
import InviteStep1 from "./InviteStep1";
import InviteStep2 from "./InviteStep2";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { useQuery, useMutation } from "@apollo/react-hooks";
import InviteSuccess from "./InviteSuccess";

const ADMIN_ROLE = "Admin";
// Checks if an email is of a valid format
const isValidEmail = email => {
  // The following is sourced from yup's email validation regex
  // eslint-disable-next-line
  const emailValid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  return !!email.match(emailValid);
};

export default function InviteFamily() {
  // States to track current invite step, the selected family, and the list of
  // invite emails
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [inviteEmails, setInviteEmails] = useState([
    { email: "", valid: false },
  ]);

  // GraphQL query for loading the family list
  const { data, loading, error } = useQuery(INVITE_LIST);
  // GraphQL mutation for sending the invites
  const [sendInviteByEmail, inviteMutationInfo] = useMutation(INVITE_BY_EMAIL);

  if (error) {
    // Handle loading error
  }

  // Handles when the invite mutation has returned a result
  /*
  Result is of the format:
    {
      sent: [emailA, emailB, ...]
      failed: [{emailA, errorA}, ...]
    }
   */
  if (inviteMutationInfo.data) {
    console.log(inviteMutationInfo.data);

    return <InviteSuccess results={inviteMutationInfo.data.inviteByEmail} />;
  }

  // Stores all the families the user has permission to invite
  let inviteFamilies = [];
  if (data && data.currentUser) {
    // Filter such that allowedID's is a list of families that the user is admin
    const allowedIDs = data.currentUser.familyRoles
      .filter(fam => fam.familyRole === ADMIN_ROLE)
      .map(fam => fam.familyId);
    inviteFamilies = data.currentUser.families.filter(fam =>
      allowedIDs.includes(fam.familyId),
    );
  }
  if (loading || inviteMutationInfo.loading) {
    return <JollyLoader />;
  }

  // Handles when a family is selected
  const handleSelectFamily = family => {
    if (selectedFamily === family) {
      setSelectedFamily(null);
    } else {
      setSelectedFamily(family);
    }
  };

  // Handles when an email index is changed
  const handleChange = (index, event) => {
    const emails = [...inviteEmails];
    const currentEmail = event.target.value;
    emails[index] = {
      email: currentEmail,
      valid: isValidEmail(currentEmail),
    };
    setInviteEmails(emails);
  };

  // Adds a new email to the email invite list
  const addEmail = email => {
    setInviteEmails([...inviteEmails, email]);
  };

  // Deletes an email from the email invite list
  const deleteEmail = index => {
    const emails = [...inviteEmails];
    emails.splice(index, 1);
    setInviteEmails(emails);
  };

  //Go to next step
  const nextStep = () => setCurrentStep(currentStep + 1);

  //Go back to prev step
  const prevStep = () => setCurrentStep(currentStep - 1);

  let allowInvite;
  if (inviteEmails.length > 1) {
    /* If there are multiple emails, only enable invite button if the only
       invalid emails are empty ones. */
    allowInvite =
      inviteEmails.some(x => x.email) &&
      inviteEmails.every(x => (x.email ? x.valid : true));
  } else {
    // Otherwise, if there only one email, enable invite button if it is valid
    allowInvite = inviteEmails.every(x => x.email && x.valid);
  }
  const handleInvite = () => {
    // Only invite valid emails
    const validEmails = inviteEmails.filter(e => e.valid);
    const payload = {
      familyId: selectedFamily.familyId,
      emails: validEmails.map(e => e.email),
    };
    console.log(payload);

    sendInviteByEmail({ variables: { input: payload } });
  };
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleInvite}
      render={props => (
        <form>
          <Container>
            <Header underline>Invite a Family Member</Header>

            <InviteStep1
              inviteFamilies={inviteFamilies}
              currentStep={currentStep}
              selectFamily={handleSelectFamily}
              selected={selectedFamily}
            />

            <InviteStep2
              currentStep={currentStep}
              addEmail={addEmail}
              deleteEmail={deleteEmail}
              inviteEmails={inviteEmails}
              selected={selectedFamily}
              handleChange={handleChange}
            />

            {/* A navigation container for the 'Back' and 'Next' buttons */}
            <FormNav>
              {currentStep !== 1 ? (
                <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
              ) : null}
              <AlignRight>
                {currentStep !== 2 ? (
                  <ButtonPrimary
                    disabled={selectedFamily == null}
                    onClick={nextStep}
                  >
                    Next
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary
                    disabled={!allowInvite}
                    onClick={props.handleSubmit}
                  >
                    Invite
                  </ButtonPrimary>
                )}
              </AlignRight>
            </FormNav>
          </Container>
        </form>
      )}
    />
  );
}
