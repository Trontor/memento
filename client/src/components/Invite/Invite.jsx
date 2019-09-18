import React, { useState } from "react";
import InviteStep1 from "./InviteStep1";
import InviteStep2 from "./InviteStep2";
import { Container } from 'ui/Helpers';
import { Header } from "ui/Typography";
import { ButtonPrimary, ButtonSecondary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { FormNav } from 'ui/Forms';
import { Formik } from "formik";

export default function InviteFamily() {
  // Set the currentStep so that the correct step component is rendered
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [inviteEmails, setInviteEmails] = useState([{ email: "", valid: false }]);

  const selectFamily = (familyName) => {
    if (selectedFamily === familyName) {
      setSelectedFamily(null)
    }
    else {
      setSelectedFamily(familyName)
    };
  }

  function handleChange(index, event) {
    const emails = [...inviteEmails];
    emails[index].email = event.target.value;
    setInviteEmails(emails)
  }

  const addEmail = (email) => {
    setInviteEmails([...inviteEmails, email])
  }

  const deleteEmail = (index) => {
    const emails = [...inviteEmails]
    emails.splice(index, 1)
    setInviteEmails(emails)
  }

  //Go to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  //Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  };

  function checkEmpty() {
    return [...inviteEmails].filter(x => x !== "").length < 1;
  }

  const validateEmail = (index, e) => {
    // The following is sourced from yup's email validation regex
    // eslint-disable-next-line
    const emailValid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    const emails = [...inviteEmails];

    e.target.value !== "" && !e.target.value.match(emailValid) ? emails[index].valid = false : emails[index].valid = true;
    setInviteEmails(emails)
  };

  return(
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      render={props => (
        <Container>
          <Header underline>Invite a Family Member</Header>

          <InviteStep1
            currentStep={currentStep}
            selectFamily={selectFamily}
            selected={selectedFamily}
          />

          <InviteStep2
            currentStep={currentStep}
            addEmail={addEmail}
            deleteEmail={deleteEmail}
            inviteEmails={inviteEmails}
            selected={selectedFamily}
            handleChange={handleChange}
            validateEmail={validateEmail}
          />

      {/* A navigation container for the 'Back' and 'Next' buttons */}
          <FormNav>
            {currentStep !== 1 ?
              <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
              : null
            }
              <AlignRight>
                {currentStep !== 2 ?
                  <ButtonPrimary disabled={selectedFamily == null} onClick={nextStep}>Next</ButtonPrimary>
                  :
                  <ButtonPrimary disabled={checkEmpty()} type="submit">Invite</ButtonPrimary>
                }
              </AlignRight>
          </FormNav>
        </Container>
      )}/>
  );
}
