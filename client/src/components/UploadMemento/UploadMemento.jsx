import React, {useState} from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { RadioOption, RadioButton, RadioButtonStyle, RadioLabel, Tag, NewTag } from './UploadMementoStyles';
import CreatableSelect from 'react-select/creatable';
import { TagsContainer } from "./UploadMementoStyles";
// import UploadStep1 from "./UploadStep1";

export default function UploadMemento() {
  //define react hooks
  const [selectMementoType, setSelectMementoType] = useState("");
  const [mementoTags, setMementoTags] = useState([]);

  const tags = ["recipes", "painting", "stuffed toys", "cars", "jewellery", "photographs", "clothing", "family", "blanket", "food"];

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
      fontSize: 13,
      width: "90%"
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

  const selectTag = (tag) => {
    if (mementoTags.includes(tag)) {
      const tags = [...mementoTags];
      const tagIndex = tags.indexOf(tag);
      if (tagIndex !== -1) {
       tags.splice(tagIndex, 1);
       setMementoTags(tags);
      }
    }
    else {
      setMementoTags([...mementoTags, tag])
    }
  }

  return (
    <Container>
      <Header underline>Create a Memento</Header>

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
      )
      }

      {selectMementoType!== "" && (
        <FormSection>
          <InstructionLabel>What does your memento contain?</InstructionLabel>
          <TagsContainer>
            { tags.sort().map(tag =>
              <Tag
                onClick={() => selectTag(tag)}
                selected={mementoTags.includes(tag)}>
                {tag}
              </Tag>
            )}
              <NewTag><i class="fas fa-plus"></i> edit/new</NewTag>
          </TagsContainer>
        </FormSection>
      )
      }
    </Container>
  )
}