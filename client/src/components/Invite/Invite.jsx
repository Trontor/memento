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
  const [inviteEmails, setInviteEmails] = useState([]);

  const selectFamily = (familyName) => {
    if (selectedFamily === familyName) {
      setSelectedFamily(null)
    }
    else {
      setSelectedFamily(familyName)
    };
  }

  const addEmails = (email) => {
    setInviteEmails(
      [...inviteEmails, email]
    )
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
      addEmails={addEmails}
      inviteEmails={inviteEmails}
      selected={selectedFamily}
      />

    <FormNav>
      { currentStep !== 1 ?
        <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
        : null
      }
      { currentStep <= 2 ?
        <AlignRight>
          <ButtonPrimary disabled={selectedFamily == null} onClick={nextStep}>Next</ButtonPrimary>
        </AlignRight>
        : null
      }
    </FormNav>

  </Container>
  );
}
