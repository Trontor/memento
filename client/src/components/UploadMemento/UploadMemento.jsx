import React from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { ButtonPrimary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { RadialSelect } from './UploadMementoStyles'


export default function UploadMemento() {
  return (
    <Container>
      <Header underline>Create a Memento</Header>

      <FormSection>
        <InstructionLabel>Is your memento an anniversary or special event?</InstructionLabel>
      </FormSection>

      <FormSection>
        <InstructionLabel>What type of event is it?</InstructionLabel>
      </FormSection>

    </Container>
  )
}