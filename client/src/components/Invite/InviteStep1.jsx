import React from "react";
import { InstructionLabel, FormHelpText, FormSection } from "ui/Forms";
import { FamilyGroup } from "./InviteStyles";
export default function InviteStep1({
  currentStep,
  selectFamily,
  selected,
  inviteFamilies,
}) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <>
      <FormSection>
        {/* Select Family Group */}
        <InstructionLabel>
          Which Family group would you like to invite people to?
        </InstructionLabel>
        {inviteFamilies.map(family => (
          <FamilyGroup
            selected={selected === family.name}
            onClick={() => selectFamily(family.name)}
          >
            {family.name}
          </FamilyGroup>
        ))}
        <FormHelpText>
          You are able to invite people to Family groups you are an
          administrator of.
        </FormHelpText>
      </FormSection>
    </>
  );
}
