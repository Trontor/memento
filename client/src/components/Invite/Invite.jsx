import React, { useState } from "react";
import InviteStep1 from "./InviteStep1";
import InviteStep2 from "./InviteStep2";
import { Container } from 'ui/Helpers';
import { Header } from "ui/Typography";
import { ButtonPrimary, ButtonSecondary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { FormNav } from 'ui/Forms';


export default function InviteFamily() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [inviteEmails, setInviteEmails] = useState([""]);

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
    emails[index]= event.target.value;
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

  return(
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
      />

    <FormNav>
      { currentStep !== 1 ?
        <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
        : null
      }

        <AlignRight>
          { currentStep !== 2 ?
            <ButtonPrimary disabled={selectedFamily == null} onClick={nextStep}>Next</ButtonPrimary>
            :
            <ButtonPrimary disabled={inviteEmails[0]=="" || inviteEmails.length < 1} type="submit">Invite</ButtonPrimary>
          }
         </AlignRight>

    </FormNav>

  </Container>
  );
}
