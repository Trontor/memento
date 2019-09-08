import React, {useState} from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { ButtonPrimary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { RadioOption, RadioButton, RadioButtonStyle, RadioLabel } from './UploadMementoStyles'

export default function UploadMemento() {
  const [selectMementoType, setSelectMementoType] = useState("");
  const handleRadioChange = e => {
    const value = e.target.value;
    setSelectMementoType(value);
  };

  return (
    <Container>
      <Header underline>Create a Memento</Header>

      <FormSection>
        <InstructionLabel>Is your memento an anniversary or special event?</InstructionLabel>
        <RadioOption>
          <RadioButton
            type="radio"
            value="event"
            name="mementoType"
            checked={selectMementoType === "event"}
            onChange={e => handleRadioChange(e)}/>
          <RadioButtonStyle/>
          <RadioLabel>
            Yes, it is an anniversary or special event.
          </RadioLabel>
        </RadioOption>

        <RadioOption>
          <RadioButton
            type="radio"
            value="object"
            name="mementoType"
            checked={selectMementoType === "object"}
            onChange={e => handleRadioChange(e)}/>
          <RadioButtonStyle/>
          <RadioLabel>
            No, it is a special object.
          </RadioLabel>
        </RadioOption>
      </FormSection>

      <FormSection>
        <InstructionLabel>What type of event is it?</InstructionLabel>
      </FormSection>

    </Container>
  )
}