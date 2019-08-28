import React from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { CirclePicker } from 'react-color';
import { PickerWrapper } from './CreateFamilyStyles';
import { StyledDropzone } from 'components/FileDropzone';

export default function CreateFamily() {
  return(
    <Container>

      <Header underline>Create a New Family</Header>

      <FormSection>
        <InstructionLabel>What would you like to name your Family group?</InstructionLabel>
        <InputField
          placeholder="Enter a cool name for your family"
          type="text"
          name="familyname"/>
        <FormHelpText>
          You'll be able to change this, so no pressure!
        </FormHelpText>
      </FormSection>

      <FormSection>
        <InstructionLabel>Select a display photo for your Family.</InstructionLabel>
        <StyledDropzone/>
        <FormHelpText>
          You can upload a photo later.
        </FormHelpText>
      </FormSection>

      <FormSection>
        <InstructionLabel>Pick a colour theme for your Family group page.</InstructionLabel>
        <PickerWrapper>
          <CirclePicker
          width="100%"/>
        </PickerWrapper>
        <FormHelpText>
          You can adjust the colour anytime you want.
        </FormHelpText>
      </FormSection>

    </Container>
  );
}