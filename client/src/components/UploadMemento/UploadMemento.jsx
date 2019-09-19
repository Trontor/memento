import React, { useState } from "react";
import { Header } from "ui/Typography";
import { Container } from "ui/Helpers";
import UploadStep1 from "./UploadStep1";
import UploadStep2 from "./UploadStep2";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import { AlignRight } from "ui/Helpers";
import { FormNav } from "ui/Forms";

export default function UploadMemento() {
  //Define react hooks
  const [selectMementoType, setSelectMementoType] = useState("");
  const [selectEventType, setSelectEventType] = useState("");
  const [mementoTags, setMementoTags] = useState([]);
  const [currentStep, setCurrentStep] = useState(2);
  const [mementoFiles, setMementoFiles] = useState([]);

  //Handle Radio value
  const handleRadioChange = option => {
    const value = option.target.value;
    setSelectMementoType(value);
  };

  //Go to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  //Go back to prev step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //Style react select dropdown with styles api
  const customDropdown = {
    control: provided => ({
      ...provided,
      cursor: "pointer",
      fontSize: 13,
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(90, 150, 255, 0.15)"
        : state.isActive
        ? "rgba(76, 212, 255, 0.3)"
        : null,
      color: state.isSelected ? "rgba(90, 150, 255)" : "#44404B",
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
  };

  const selectTag = tag => {
    if (mementoTags.includes(tag)) {
      const tags = [...mementoTags];
      const tagIndex = tags.indexOf(tag);
      if (tagIndex !== -1) {
        tags.splice(tagIndex, 1);
        setMementoTags(tags);
      }
    } else {
      setMementoTags([...mementoTags, tag]);
    }
  };

  const addFile = file => {
    setMementoFiles([...mementoFiles, file]);
  };

  const deleteFile = file => {
    const files = [...mementoFiles];
    const fileIndex = files.indexOf(file);
    if (fileIndex !== -1) {
      files.splice(fileIndex, 1);
      setMementoFiles(files);
    }
  };

  return (
    <Container>
      <Header underline>Create a Memento</Header>

      {currentStep === 1 && (
        <UploadStep1
          selectMementoType={selectMementoType}
          selectEventType={selectEventType}
          setSelectEventType={setSelectEventType}
          handleRadioChange={handleRadioChange}
          customDropdown={customDropdown}
        />
      )}

      {currentStep === 2 && (
        <UploadStep2
          mementoTags={mementoTags}
          selectTag={selectTag}
          addFile={addFile}
          deleteFile={deleteFile}
          mementoFiles={mementoFiles}
          setMementoFiles={setMementoFiles}
          customDropdown={customDropdown}
        />
      )}

      <FormNav>
        {currentStep !== 1 ? (
          <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
        ) : null}

        <AlignRight>
          {currentStep !== 2 ? (
            <ButtonPrimary onClick={nextStep}>Next</ButtonPrimary>
          ) : (
            <ButtonPrimary type="submit">Next</ButtonPrimary>
          )}
        </AlignRight>
      </FormNav>
    </Container>
  );
}
