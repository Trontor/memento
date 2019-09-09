import React, {useState} from "react";
import { Header } from "ui/Typography";
import { Container } from 'ui/Helpers';
import UploadStep1 from "./UploadStep1";
import UploadStep2 from "./UploadStep2";

import { ButtonPrimary, ButtonSecondary } from 'ui/Buttons';
import { AlignRight } from 'ui/Helpers';
import { FormNav } from 'ui/Forms';

export default function UploadMemento() {
  //define react hooks
  const [selectMementoType, setSelectMementoType] = useState("");
  const [selectEventType, setSelectEventType] = useState("");
  const [mementoTags, setMementoTags] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleRadioChange = option => {
    const value = option.target.value;
    setSelectMementoType(value);
  };

  const handleSetEventType = option => {
    setSelectEventType(option);
  };

  //Go to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  //Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
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

      { currentStep === 1 && (
      <UploadStep1
        selectMementoType={selectMementoType}
        selectEventType={selectEventType}
        setSelectEventType={setSelectEventType}
        handleRadioChange={handleRadioChange}
        customDropdown={customDropdown}
      />
      )}

      { currentStep === 2 && (
        <UploadStep2
          mementoTags={mementoTags}
          selectTag={selectTag}
        />
      )}

      <FormNav>
        { currentStep !== 1 ?
          <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
          : null
        }

        <AlignRight>
          { currentStep !== 2 ?
            <ButtonPrimary onClick={nextStep}>Next</ButtonPrimary>
            :
            <ButtonPrimary type="submit">Invite</ButtonPrimary>
          }
        </AlignRight>

      </FormNav>
    </Container>
  )
}