import React, {useState} from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { RadioOption, RadioButton, RadioButtonStyle, RadioLabel } from './UploadMementoStyles';
import CreatableSelect from 'react-select/creatable';

export default function UploadMemento() {
  const [selectMementoType, setSelectMementoType] = useState("");
  const eventOptions = [
    { value: 'birthday', label: 'Birthday' },
    { value: 'childbirth', label: 'Childbirth' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'first date', label: 'First Date' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'first day at school', label: 'First Day at School' }
  ];

  const handleRadioChange = e => {
    const value = e.target.value;
    setSelectMementoType(value);
  };

  //style react select dropdown with styles api
  const customDropdown = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      fontSize: 13
      }
    ),
    option: (provided, state) => ({
      ...provided,
      // color: state.isFocused ? "rgba(76, 212, 255)" : "#44404B",
      backgroundColor: state.isFocused ? "rgba(90, 150, 255, 0.15)" : state.isActive ? "rgba(76, 212, 255, 0.3)" : null,
      color: state.isSelected ? "rgba(90, 150, 255)": "#44404B",
      padding: 10,
      fontSize: 13,
      cursor: "pointer",
    }),
    menu: base => ({
      ...base,
      zIndex: 100,
      marginTop: "2px",
      boxShadow: "0 1px 3px rgba(0,0,0,.08)",
      border: "1px solid #ddd",
    }),
  }

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
      )
      }

    </Container>
  )
}