import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import { PageHeader } from "./typography.stories";
import { Container } from "./helpers";
import { InputField, FormHelpText } from "./forms.stories";
import { CirclePicker } from "react-color";
import { StyledDropzone } from "./uploader.stories";

const InstructionLabel = styled.label`
  font-size: 16px;
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  display: block;
  margin-bottom: 1em;
  opacity: 0.8;
  margin-top: 60px;
`;

const PickerWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;

storiesOf("Create New Family", module).add("Default", () => (
  <Container>
    <PageHeader underline>Create a New Family</PageHeader>
    <InstructionLabel>
      What would you like to name your Family group?
    </InstructionLabel>
    <InputField
      placeholder="Enter a cool name for your family"
      type="text"
      name="familyname"
    />
    <FormHelpText>You'll be able to change this, so no pressure!</FormHelpText>

    <InstructionLabel>Select a display photo for your Family.</InstructionLabel>
    <StyledDropzone />
    <FormHelpText>You can upload a photo later.</FormHelpText>
    <InstructionLabel>
      Pick a colour theme for your Family group page.
    </InstructionLabel>
    <PickerWrapper>
      <CirclePicker width="100%" />
    </PickerWrapper>
    <FormHelpText>You can change your colour anytime you want.</FormHelpText>
  </Container>
));
