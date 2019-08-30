import React from "react";
import { InstructionLabel, FormHelpText, FormSection } from 'ui/Forms';
import { FamilyGroup, FamilyGroupList } from "./InviteStyles";

export default function InviteStep1({ currentStep, selectFamily, selected}) {

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

  if (currentStep !== 1) {
    return null
  }

  return(
    <>
      <FormSection>
        <InstructionLabel>Which Family group would you like to invite members to?</InstructionLabel>
        <FamilyGroupList>
          { familyGroups.map((family)=>(
            <FamilyGroup selected={selected === family.name} onClick={() => selectFamily(family.name)}>
              { family.name }
            </FamilyGroup>
          ))}
        </FamilyGroupList>
        <FormHelpText>
          You are able to invite members to Family groups you are an administrator of.
        </FormHelpText>
      </FormSection>
    </>
  );
}
