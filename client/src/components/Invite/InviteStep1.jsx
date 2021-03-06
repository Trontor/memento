import { FormHelpText, FormSection, InstructionLabel } from "ui/Forms";

import { FamilyGroup } from "./InviteStyles";
import React from "react";
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
            type="button"
            selected={selected === family}
            onClick={() => selectFamily(family)}
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
