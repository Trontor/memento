import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import { FormSection, InputField, InstructionLabel, TextArea } from "ui/Forms";
import { NewTag, Tag, TagsContainer } from "./UploadMementoStyles";
import React, { useState } from "react";

import { AlignRight } from "ui/Helpers";
import CreatableSelect from "react-select/creatable";
import DateSelector from "components/DateSelector/DateSelector";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import Textarea from "react-textarea-autosize";
import { Formik } from "formik";

const initialFormValues = {
  title: "Test Memento",
  description: "This is a description",
  date: new Date(),
  memberTags: [],
  tags: [],
  file: null,
  location: "Amsterdam",
};

export default function UploadStep2({ customDropdown, onSubmit, members }) {
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
  console.log(familyMemberOptions);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={onSubmit}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <FormSection>
            <InstructionLabel>Title:</InstructionLabel>
            <InputField
              value={props.values.title}
              name="title"
              onChange={props.handleChange}
              placeholder="Enter a cool title..."
            />
          </FormSection>

          <FormSection>
            <InstructionLabel>Description:</InstructionLabel>
            <TextArea>
              <Textarea
                type="text"
                name="description"
                onChange={props.handleChange}
                value={props.values.description}
                placeholder=""
              />
            </TextArea>
          </FormSection>

          <FormSection>
            <InstructionLabel>Date:</InstructionLabel>
            <DateSelector
              setFieldValue={props.setFieldValue}
              // onChange={props.handleChange}
              value={props.values.date}
              customDropdown={customDropdown}
            />
          </FormSection>

          <FormSection>
            <InstructionLabel>Tag People:</InstructionLabel>
            <CreatableSelect
              isClearable
              placeholder="Select a Family Member..."
              styles={customDropdown}
              isMulti
              name="memberTags"
              value={familyMemberOptions.filter(m =>
                props.values.memberTags.includes(m.value),
              )}
              onChange={members => {
                const memberIDs = !members ? [] : members.map(m => m.value);
                console.log(memberIDs);
                props.setFieldValue("memberTags", memberIDs);
              }}
              options={familyMemberOptions}
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
                      props.setFieldValue("tags", [...props.values.tags, tag]);
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
                    props.setFieldValue("tags", [...props.values.tags, newTag]);
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
      )}
    />
  );
}
