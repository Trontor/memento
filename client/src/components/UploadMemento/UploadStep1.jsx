import React from "react";
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { RadioOption, RadioButton, RadioButtonStyle, RadioLabel, Tag, NewTag } from './UploadMementoStyles';
import CreatableSelect from 'react-select/creatable';

export default function UploadStep1(){
  return(
    <>
      <FormSection>
      <InstructionLabel>Is your memento a special event? (e.g. anniversary, birthday, graduation)</InstructionLabel>
      <RadioOption>
        <RadioButton
          type="radio"
          value="event"
          name="mementoType"
          checked={selectMementoType === "event"}
          onChange={e => handleRadioChange(e)}/>
        <RadioButtonStyle/>
        <RadioLabel>
          Yes, it is a special event.
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
          No, but it is a special item.
        </RadioLabel>
      </RadioOption>
    </FormSection>

    {selectMementoType === "event" && (
      <FormSection>
        <InstructionLabel>What kind of event is it?</InstructionLabel>
        <CreatableSelect
          isClearable
          options={eventOptions}
          placeholder="Type to create your own special event..."
          styles={customDropdown}
        />
      </FormSection>
    )}
    </>
  )
}