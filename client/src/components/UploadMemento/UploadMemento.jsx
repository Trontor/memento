import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

// import { AlignRight } from "ui/Helpers";
import { CREATE_NEW_MEMENTO } from "mutations/Memento";
import { Container } from "ui/Helpers";
import { FormNav } from "ui/Forms";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import UploadStep1 from "./UploadStep1";
import UploadStep2 from "./UploadStep2";

const regularQuotes = ["Loading..."];
const machineVisionQuotes = [
  "👀 Applying Norton Vision 👀",
  "Using Eyes of Leon",
  "Uploading Memento...",
  "101001010101001010100001010001",
];
export default function UploadMemento(props) {
  //Define react hooks
  const [selectMementoType, setSelectMementoType] = useState("");
  const [selectEventType, setSelectEventType] = useState("");
  const [currentStep, setCurrentStep] = useState(2);
  const familyId = props.match.params.id;
  const { data, loading } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
  });
  const [uploadMemento, uploadMementoResults] = useMutation(
    CREATE_NEW_MEMENTO,
    {
      onCompleted: data => {
        if (data && data.createMemento) {
          props.history.push("/family/" + familyId);
        }
      },
    },
  );
  // uploadMementoResults.loading = true;
  if (loading || uploadMementoResults.loading) {
    return (
      <JollyLoader
        interval={2500}
        quotes={
          uploadMementoResults.loading ? machineVisionQuotes : regularQuotes
        }
        brain={uploadMementoResults.loading}
      />
    );
  }

  let members;

  if (data) {
    members = data.family.members;
  }

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
    control: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      fontSize: 13,
      width: "100%",
      backgroundColor: "transparent",
      borderColor: state.isSelected
        ? "rgba(255, 127, 95, 0.8)"
        : state.isFocused
        ? "rgba(255, 127, 95, 0.8)"
        : "#ddd",
      boxShadow: state.isSelected ? "0 0 1px rgba(255, 127, 95, 0.8)" : null,
      ":hover": {
        borderColor: "rgba(255, 127, 95, 0.7)",
      },
      ":active": {
        boxShadow: "0 0 1px rgba(255, 127, 95)",
      },
      ":focus": {
        borderColor: "rgba(255, 127, 95)",
        boxShadow: "0 0 1px rgba(255, 127, 95)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 127, 95, 0.15)"
        : state.isSelected
        ? "rgba(255, 127, 95, 0.3)"
        : null,
      color: state.isSelected ? "rgba(255, 127, 95)" : "#44404B",
      padding: 10,
      fontSize: 13,
      cursor: "pointer",
      ":active": {
        backgroundColor: "rgba(255, 127, 95, 0.5)",
      },
    }),
    menu: base => ({
      ...base,
      zIndex: 100,
      marginTop: "2px",
      boxShadow: "0 1px 3px rgba(0,0,0,.08)",
      border: "1px solid #ddd",
    }),
  };

  // const selectTag = tag => {
  //   if (mementoTags.includes(tag)) {
  //     const tags = [...mementoTags];
  //     const tagIndex = tags.indexOf(tag);
  //     if (tagIndex !== -1) {
  //       tags.splice(tagIndex, 1);
  //       setMementoTags(tags);
  //     }
  //   } else {
  //     setMementoTags([...mementoTags, tag]);
  //   }
  // };

  // const addFile = file => {
  //   setMementoFiles([...mementoFiles, file]);
  // };

  // const deleteFile = file => {
  //   const files = [...mementoFiles];
  //   const fileIndex = files.indexOf(file);
  //   if (fileIndex !== -1) {
  //     files.splice(fileIndex, 1);
  //     setMementoFiles(files);
  //   }
  // };
  const onSubmit = values => {
    const mediaType =
      values.file && values.file.type.includes("image") ? "Image" : "Video";
    const mutationValues = {
      familyId: familyId,
      type: "Test",
      title: values.title,
      description: values.description,
      location: values.location,
      dates: [
        {
          day: values.date.getDate(),
          month: values.date.getMonth() + 1,
          year: values.date.getFullYear(),
        },
      ],
      media: !values.file
        ? null
        : {
            type: mediaType,
            file: values.file,
            caption: "Test Caption",
          },
      people: values.memberTags,
      beneficiaries: values.beneficiaries,
      tags: values.tags,
    };
    console.log("Submitting memento:", mutationValues);

    uploadMemento({ variables: { input: mutationValues } });
  };
  return (
    <Container>
      <form onSubmit={props.handleSubmit}>
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
            // mementoTags={mementoTags}
            // selectTag={selectTag}
            // addFile={addFile}
            // deleteFile={deleteFile}
            // mementoFiles={mementoFiles}
            // setMementoFiles={setMementoFiles}
            currentUserId={data.currentUser.userId}
            customDropdown={customDropdown}
            members={members}
            onSubmit={onSubmit}
          />
        )}

        <FormNav>
          {currentStep !== 1 ? (
            <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
          ) : null}

          {currentStep !== 2 ? (
            <ButtonPrimary onClick={nextStep}>Next</ButtonPrimary>
          ) : (
            <ButtonPrimary type="submit">Create Memento</ButtonPrimary>
          )}
        </FormNav>
      </form>
    </Container>
  );
}
