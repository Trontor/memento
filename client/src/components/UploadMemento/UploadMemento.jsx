import * as yup from "yup";

import { ButtonPrimary, ButtonPrimaryLight, ButtonSecondary } from "ui/Buttons";
import {
  Error,
  FormSection,
  InputField,
  InstructionLabel,
  TextArea,
} from "ui/Forms";
import { NewTag, NewTagsForm, PreviewImg, RemovePhoto, Req, Tag, TagsContainer } from "./UploadMementoStyles";
import {
  RadioButton,
  RadioButtonStyle,
  RadioLabel,
  RadioOption,
} from "ui/Radio";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { AlignRight } from "ui/Helpers";
// import { AlignRight } from "ui/Helpers";
import { CREATE_NEW_MEMENTO } from "mutations/Memento";
import { Container } from "ui/Helpers";
import CreatableSelect from "react-select/creatable";
import DateSelector from "components/DateSelector/DateSelector";
import { FormNav } from "ui/Forms";
import { Formik } from "formik";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import Select from "react-select";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import imageCompression from "browser-image-compression";

const regularQuotes = ["Loading..."];

const initialFormValues = {
  event: true,
  type: null,
  title: "",
  description: "",
  date: null,
  memberTags: [],
  beneficiaries: [],
  tags: [],
  file: null,
  location: "",
};
const MAX_FILE_SIZE = 160 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const uploadMementoValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("You must enter a title")
    .min(2, "Your title must be a minimum of 2 characters"),
  description: yup.string(),
  date: yup
    .date()
    .nullable()
    .required("Date Required"),
  tags: yup.array(),
  beneficiaries: yup.array(),
  location: yup.string(),
  file: yup
    .mixed()
    .nullable()
    .test(
      "fileSize",
      "File too large",
      value => !value || value.size <= MAX_FILE_SIZE,
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => !value || SUPPORTED_FORMATS.includes(value.type),
    ),
});
const eventOptions = [
  { value: "birthday", label: "Birthday" },
  { value: "childbirth", label: "Childbirth" },
  { value: "graduation", label: "Graduation" },
  { value: "it project", label: "IT Project Presentation" },
  { value: "first date", label: "First Date" },
  { value: "wedding", label: "Wedding" },
  { value: "first day at school", label: "First Day at School" },
];
const machineVisionQuotes = [
  "👀 Applying Norton Vision 👀",
  "Using Eyes of Leon",
  "Uploading Memento...",
  "101001010101001010100001010001",
];

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

export default function UploadMemento(props) {
  const [optimisticLoading, setOptimisticLoading] = useState(false);
  const familyId = props.match.params.id;
  const { data, loading } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
  });

  const [uploadMemento, uploadMementoResults] = useMutation(
    CREATE_NEW_MEMENTO,
    {
      onCompleted: data => {
        setOptimisticLoading(false);
        if (data && data.createMemento) {
          // Check if any detected labels
          if (data.createMemento.detectedLabels.length > 0) {
            props.history.push(
              "/memento/" + data.createMemento.mementoId + "/vision",
            );
          } else {
            props.history.push("/family/" + familyId);
          }
        }
      },
      onError: error => {
        setOptimisticLoading(false);
        console.log("Error uploading image:", error);
      },
    },
  );

  const [tags, setTags] = useState([
    "recipes",
    "painting",
    "stuffed toys",
    "cars",
    "jewellery",
    "photographs",
    "clothing",
    "family",
    "blanket",
    "food",
  ]);

  const [newTag, setNewTag] = useState(null);

  const handleChange = tag => {
    tag = tag.target.value;
    setNewTag(tag);
  };

  if (loading || uploadMementoResults.loading || optimisticLoading) {
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

  const onSubmit = async values => {
    const mediaType =
      values.file && values.file.type.includes("image") ? "Image" : "Video";
    setOptimisticLoading(true);
    // Compress file
    let compressedFile = null;
    if (values.file) {
      compressedFile = await imageCompression(values.file, {
        maxWidthOrHeight: 800,
      });
    }
    const mutationValues = {
      familyId: familyId,
      type: values.type ? values.type.value : "item",
      title: values.title,
      description: values.description,
      location: values.location,
      dates: [
        {
          day: values.date.getDate(),
          month: values.date.getMonth(),
          year: values.date.getFullYear(),
        },
      ],
      media: !compressedFile
        ? null
        : {
            type: mediaType,
            file: compressedFile,
            caption: "Test Caption",
          },
      people: values.memberTags,
      beneficiaries: values.beneficiaries,
      tags: values.tags,
    };
    console.log("Submitting memento:", mutationValues);
    uploadMemento({ variables: { input: mutationValues } });
  };

  let familyMemberOptions = members.map(member => ({
    label: `${member.firstName} ${member.lastName}`,
    value: member.userId,
  }));
  const currentUserId = data.currentUser.userId;
  return (
    <Container>
      <Formik
        initialValues={initialFormValues}
        validationSchema={uploadMementoValidationSchema}
        onSubmit={onSubmit}
        render={props => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Header underline>Create a Memento</Header>
              <FormSection>
                <InstructionLabel>
                  What type of memento would you like to create?
                </InstructionLabel>
                <RadioOption>
                  <RadioButton
                    type="radio"
                    value="object"
                    name="mementoType"
                    checked={!props.values.event}
                    onChange={e =>
                      props.setFieldValue("event", !e.target.checked)
                    }
                  />
                  <RadioButtonStyle />
                  <RadioLabel>Item (e.g. painting, stuffed toy, photograph).</RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioButton
                    type="radio"
                    value="event"
                    checked={props.values.event}
                    onChange={e =>
                      props.setFieldValue("event", e.target.checked)
                    }
                  />
                  <RadioButtonStyle />
                  <RadioLabel>Event (e.g. anniversary, birthday,
                  graduation).</RadioLabel>
                </RadioOption>
              </FormSection>

              {props.values.event && (
                <FormSection>
                  <InstructionLabel>What kind of event is it?<Req>*</Req></InstructionLabel>
                  <CreatableSelect
                    isClearable
                    options={eventOptions}
                    placeholder="Type to create your own special event..."
                    styles={customDropdown}
                    value={props.values.type}
                    onChange={option => props.setFieldValue("type", option)}
                  />
                </FormSection>
              )}

              <FormSection>
                <InstructionLabel>Title<Req>*</Req></InstructionLabel>
                <InputField
                  value={props.values.title}
                  name="title"
                  onChange={props.handleChange}
                  placeholder="Enter a cool title..."
                />
                {props.errors.title && props.touched.title && (
                  <Error>{props.errors.title}</Error>
                )}
              </FormSection>

              <FormSection>
                <InstructionLabel>Add a media file:</InstructionLabel>
                {props.values.file ? (
                  <div>
                    <PreviewImg>
                      <img
                        alt={props.values.file.name}
                        src={URL.createObjectURL(props.values.file)}
                      />
                      <span>{props.values.file.name}</span>
                      <RemovePhoto onClick={() => props.setFieldValue("file", null)}>
                        Remove
                      </RemovePhoto>
                    </PreviewImg>
                  </div>
                ) : (
                  <StyledDropzone
                    onFilesAdded={files =>
                      props.setFieldValue("file", files[0])
                    }
                  />
                )}
                {props.errors.file && props.touched.file && (
                  <Error>{props.errors.file}</Error>
                )}
              </FormSection>
              <FormSection>
                <InstructionLabel>Description</InstructionLabel>
                <TextArea
                  type="text"
                  name="description"
                  onChange={props.handleChange}
                  value={props.values.description}
                  placeholder=""
                />
              </FormSection>
              {props.errors.description && props.touched.description && (
                <Error>{props.errors.description}</Error>
              )}
              <FormSection>
                <InstructionLabel>Date</InstructionLabel>
                <DateSelector
                  setFieldValue={props.setFieldValue}
                  // onChange={props.handleChange}
                  value={props.values.date}
                  customDropdown={customDropdown}
                />
                {props.errors.date && props.touched.date && (
                  <Error>{props.errors.date}</Error>
                )}
              </FormSection>

              <FormSection>
                <InstructionLabel>Tag People:</InstructionLabel>
                <Select
                  isClearable
                  placeholder="Select family members.."
                  styles={customDropdown}
                  isMulti
                  create
                  name="memberTags"
                  value={familyMemberOptions.filter(m =>
                    props.values.memberTags.includes(m.value),
                  )}
                  onChange={members => {
                    const memberIDs = !members ? [] : members.map(m => m.value);
                    props.setFieldValue("memberTags", memberIDs);
                  }}
                  options={familyMemberOptions}
                />
              </FormSection>
              {!props.values.event && (
                <FormSection>
                  <InstructionLabel>Assign Beneficiaries:</InstructionLabel>
                  <Select
                    isClearable
                    placeholder="Select family members..."
                    styles={customDropdown}
                    isMulti
                    create
                    name="beneficiaries"
                    value={familyMemberOptions.filter(m =>
                      props.values.beneficiaries.includes(m.value),
                    )}
                    onChange={members => {
                      const memberIDs = !members
                        ? []
                        : members.map(m => m.value);
                      props.setFieldValue("beneficiaries", memberIDs);
                    }}
                    options={familyMemberOptions.filter(
                      m => m.value !== currentUserId,
                    )}
                  />
                </FormSection>
              )}
              <FormSection>
                <InstructionLabel>Add Location:</InstructionLabel>
                <InputField
                  name="location"
                  onChange={props.handleChange}
                  value={props.values.location}
                  placeholder="Enter the name of a location..."
                />
                {props.errors.location && props.touched.location && (
                  <Error>{props.errors.location}</Error>
                )}
              </FormSection>
              <FormSection>
                <InstructionLabel>Select Tags:</InstructionLabel>
                <TagsContainer>
                  {tags.sort().map(tag => (
                    <Tag
                      onClick={() => {
                        if (props.values.tags.includes(tag)) {
                          props.setFieldValue(
                            "tags",
                            props.values.tags.filter(t => t !== tag),
                          );
                        } else {
                          props.setFieldValue("tags", [
                            ...props.values.tags,
                            tag,
                          ]);
                        }
                      }}
                      selected={props.values.tags.includes(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                  <NewTag type="button" onClick={() => setNewTag("")}>
                    <i className="fas fa-plus"></i> new tag
                  </NewTag>
                </TagsContainer>

                {newTag !== null && (
                  <NewTagsForm>
                    <InputField
                      placeholder="New tag name"
                      value={newTag}
                      onChange={e => handleChange(e)}
                      // onBlur={() => setDefaultTags([...defaultTags, newTag])}
                    />
                    <FormNav>
                      <ButtonSecondary
                        type="button"
                        onClick={() => setNewTag(null)}
                      >
                        Cancel
                      </ButtonSecondary>

                      <ButtonPrimaryLight
                        type="button"
                        onClick={() => {
                          setTags([...new Set([...tags, newTag])]);
                          props.setFieldValue("tags", [
                            ...props.values.tags,
                            newTag,
                          ]);
                          setNewTag(null);
                        }}
                      >
                        Add new tag
                      </ButtonPrimaryLight>
                    </FormNav>
                  </NewTagsForm>
                )}
              </FormSection>
              {/* {currentStep === 1 && (
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
        */}
              <FormNav>
                {/* {currentStep !== 1 ? (
            <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary>
          ) : null} */}
                {/* <ButtonSecondary onClick={prevStep}>Back</ButtonSecondary> */}
                <AlignRight>
                  <ButtonPrimary type="submit">Create Memento</ButtonPrimary>
                </AlignRight>

                {/* {currentStep !== 2 ? (
            <ButtonPrimary onClick={nextStep}>Next</ButtonPrimary>
          ) : (
            <ButtonPrimary type="submit">Create Memento</ButtonPrimary>
          )} */}
              </FormNav>
            </form>
          );
        }}
      />
    </Container>
  );
}
