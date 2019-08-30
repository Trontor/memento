import React, { useState } from "react";
import { Container } from 'ui/Helpers';
import { InstructionLabel, FormHelpText, FormSection } from 'ui/Forms';
import { ButtonPrimary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { FamilyGroup, FamilyGroupList } from "./InviteStyles";

export default function InviteStep1(props) {

  const familyGroups = [
    {
      name: "Keith and Regina"
    },
    {
      name: "Hans & Joyce"
    },
    {
      name: "Gigi's family"
    }
  ]

  return(
    <>
      <FormSection>
        <InstructionLabel>Which Family group would you like to invite members to?</InstructionLabel>
        <FamilyGroupList>
          { familyGroups.map((family)=>(
            <FamilyGroup selected={props.selected === family.name} onClick={() => props.selectFamily(family.name)}>
              { family.name }
            </FamilyGroup>
          ))}
        </FamilyGroupList>
        <FormHelpText>
          You are able to invite members to Family groups you are an administrator of.
        </FormHelpText>
      </FormSection>

      <AlignRight>
        <ButtonPrimary disabled={props.selected == null}>Next</ButtonPrimary>
      </AlignRight>
    </>
  );
}
