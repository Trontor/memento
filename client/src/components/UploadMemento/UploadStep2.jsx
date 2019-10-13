import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import {
  FormSection,
  Error,
  InputField,
  InstructionLabel,
  TextArea,
} from "ui/Forms";
import { NewTag, Tag, TagsContainer } from "./UploadMementoStyles";
import React, { useState } from "react";
import { AlignRight } from "ui/Helpers";
import Select from "react-select";
import DateSelector from "components/DateSelector/DateSelector";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import { Formik } from "formik";
import * as yup from "yup";

const initialFormValues = {
  title: "",
  description: "",
  date: null,
  memberTags: [],
  beneficiaries: [],
  tags: [],
  file: null,
  location: "Amsterdam",
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

export default function UploadStep2({
  currentUserId,
  customDropdown,
  onSubmit,
  members,
}) {
  let familyMemberOptions = members.map(member => ({
    label: `${member.firstName} ${member.lastName}`,
    value: member.userId,
  }));

  // const [defaultTags, setDefaultTags] = useState(tags);

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

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={uploadMementoValidationSchema}
      onSubmit={onSubmit}
      render={props => {
        // console.log(props);
        return (
          <form onSubmit={props.handleSubmit}>
            <FormSection>
              <InstructionLabel>Title:</InstructionLabel>
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
              <InstructionLabel>Description:</InstructionLabel>
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
              <InstructionLabel>Date:</InstructionLabel>
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
                  const memberIDs = !members ? [] : members.map(m => m.value);
                  props.setFieldValue("beneficiaries", memberIDs);
                }}
                options={familyMemberOptions.filter(
                  m => m.value !== currentUserId,
                )}
              />
            </FormSection>

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
              <InstructionLabel>Add media files:</InstructionLabel>
              {props.values.file ? (
                <div>
                  <span>{props.values.file.name}</span>
                  <span onClick={() => props.setFieldValue("file", null)}>
                    {" "}
                    Remove
                  </span>
                </div>
              ) : (
                <StyledDropzone
                  onFilesAdded={files => props.setFieldValue("file", files[0])}
                />
              )}
              {props.errors.file && props.touched.file && (
                <Error>{props.errors.file}</Error>
              )}
            </FormSection>

            <FormSection>
              <InstructionLabel>Tags:</InstructionLabel>
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
                  <i class="fas fa-plus"></i> new tag
                </NewTag>
              </TagsContainer>

              {newTag !== null && (
                <>
                  <InputField
                    placeholder="New tag name"
                    value={newTag}
                    onChange={e => handleChange(e)}
                    // onBlur={() => setDefaultTags([...defaultTags, newTag])}
                  />

                  <ButtonPrimary
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
                    Create new tag
                  </ButtonPrimary>

                  <AlignRight>
                    <ButtonSecondary
                      type="button"
                      onClick={() => setNewTag(null)}
                    >
                      Cancel
                    </ButtonSecondary>
                  </AlignRight>
                </>
              )}
            </FormSection>
            <FormSection>
              <ButtonPrimary type="submit">Create Memento</ButtonPrimary>
            </FormSection>
          </form>
        );
      }}
    />
  );
}
