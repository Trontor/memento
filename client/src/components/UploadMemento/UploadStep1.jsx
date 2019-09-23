import { FormSection, InstructionLabel } from "ui/Forms";
import {
  RadioButton,
  RadioButtonStyle,
  RadioLabel,
  RadioOption,
} from "ui/Radio";

import CreatableSelect from "react-select/creatable";
import React from "react";

export default function UploadStep1({
  selectMementoType,
  selectEventType,
  setSelectEventType,
  handleRadioChange,
  customDropdown,
}) {
  const eventOptions = [
    { value: "birthday", label: "Birthday" },
    { value: "childbirth", label: "Childbirth" },
    { value: "graduation", label: "Graduation" },
    { value: "first date", label: "First Date" },
    { value: "wedding", label: "Wedding" },
    { value: "first day at school", label: "First Day at School" },
  ];

  return (
    <>
      <FormSection>
        <InstructionLabel>
          Is your memento a special event? (e.g. anniversary, birthday,
          graduation)
        </InstructionLabel>
        <RadioOption>
          <RadioButton
            type="radio"
            value="event"
            name="mementoType"
            checked={selectMementoType === "event"}
            onChange={e => handleRadioChange(e)}
          />
          <RadioButtonStyle />
          <RadioLabel>Yes, it is a special event.</RadioLabel>
        </RadioOption>

        <RadioOption>
          <RadioButton
            type="radio"
            value="object"
            name="mementoType"
            checked={selectMementoType === "object"}
            onChange={e => handleRadioChange(e)}
          />
          <RadioButtonStyle />
          <RadioLabel>No, but it is a special item.</RadioLabel>
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
            value={selectEventType}
            onChange={option => setSelectEventType(option)}
          />
        </FormSection>
      )}
    </>
  );
}
