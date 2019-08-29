import React, { useState } from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, FormHelpText, FormSection } from 'ui/Forms';
import { ButtonPrimary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { FamilyGroup, FamilyGroupList } from "./InviteFamilyStyles";

export default function CreateFamily() {
  const [selected, setSelected] = useState(false);

  return(
    <Container>

      <Header underline>Invite a Family Member</Header>

      <FormSection>
        <InstructionLabel>Which Family group would you like to invite members to?</InstructionLabel>
        <FamilyGroupList>
          <FamilyGroup selected={selected} onclick={()=> setSelected(!selected)}>Leung</FamilyGroup>
          <FamilyGroup>Siu</FamilyGroup>
        </FamilyGroupList>
        <FormHelpText>
          You are able to invite members to Family groups you are an administrator of.
        </FormHelpText>
      </FormSection>

      <AlignRight>
        <ButtonPrimary>Next</ButtonPrimary>
      </AlignRight>

    </Container>
  );
}
