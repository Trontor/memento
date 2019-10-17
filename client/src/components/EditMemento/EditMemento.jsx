import React, { useState } from "react";
import { Formik } from "formik";
//import * as yup from "yup";
import { Container } from "ui/Helpers";
import { FormSection, InstructionLabel, InputField } from "ui/Forms";
import EditInput from "components/EditInput/EditInput";
import { Header } from "ui/Typography";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import {
  NewTag,
  Tag,
  TagsContainer,
} from "../UploadMemento/UploadMementoStyles";
import { AlignRight } from "ui/Helpers";
import Select from "react-select";
import DateSelector from "components/DateSelector/DateSelector";

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
// const editMementoValidationSchema = yup.object().shape({
//   title: yup
//     .string()
//     .required("You must enter a title")
//     .min(2, "Your title must be a minimum of 2 characters"),
//   description: yup.string(),
//   date: yup
//     .date()
//     .nullable()
//     .required("Date Required"),
//   tags: yup.array(),
//   beneficiaries: yup.array(),
//   location: yup.string(),
// });

export default function EditMemento() {
  const memento = {
    title: "Childhood pic",
    description: "This is my childhood pic",
    location: "Amsterdam",
    familyMemberOptions: [
      { label: "Gigi Leung", value: 1 },
      { label: "Valerie Febriana", value: 2 },
      { label: "Rohyl Joshi", value: 3 },
      { label: "Jackson Huang", value: 4 },
    ],
    memberTags: [
      { label: "Gigi Leung", value: 1 },
      { label: "Valerie Febriana", value: 2 },
    ],
    tags: ["cars", "family"],
  };

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
      initialValues={memento}
      //validationSchema={editMementoValidationSchema}
      render={props => {
        // console.log(props);
        return (
          <Container>
            <Header underline>Edit Memento</Header>
            <FormSection>
              <EditInput
                name="title"
                value={props.values.title}
                inputLabel="Title"
                onChange={props.handleChange}
              />
            </FormSection>
            <FormSection>
              <EditInput
                name="description"
                value={props.values.description}
                inputLabel="Description"
                onChange={props.handleChange}
              />
            </FormSection>
            <FormSection>
              <InstructionLabel>Date:</InstructionLabel>
              <DateSelector
                setFieldValue={props.setFieldValue}
                // onChange={props.handleChange}
                value={props.values.date}
                //customDropdown={customDropdown}
              />
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
                value={memento.memberTags}
                // onChange={members => {
                //   const memberIDs = !members ? [] : members.map(m => m.value);
                //   props.setFieldValue("memberTags", memberIDs);
                // }}
                options={memento.familyMemberOptions}
              />
            </FormSection>

            <FormSection>
              <InstructionLabel>Assign Beneficiaries:</InstructionLabel>
              <Select
                isClearable
                placeholder="Select family members..."
                //styles={customDropdown}
                isMulti
                create
                name="beneficiaries"
                // value={familyMemberOptions.filter(m =>
                //   props.values.beneficiaries.includes(m.value),
                // )}
                // onChange={members => {
                //   const memberIDs = !members ? [] : members.map(m => m.value);
                //   props.setFieldValue("beneficiaries", memberIDs);
                // }}
                // options={familyMemberOptions.filter(
                //   m => m.value !== currentUserId,
                // )}
              />
            </FormSection>

            <FormSection>
              <EditInput
                name="location"
                value={props.values.location}
                inputLabel="Add Location:"
                onChange={props.handleChange}
              />
            </FormSection>

            <FormSection>
              <InstructionLabel>Tags:</InstructionLabel>
              <TagsContainer>
                {tags.sort().map(tag => (
                  <Tag
                  // onClick={() => {
                  //   if (props.values.tags.includes(tag)) {
                  //     props.setFieldValue(
                  //       "tags",
                  //       props.values.tags.filter(t => t !== tag),
                  //     );
                  //   }
                  //}}
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
                    //onBlur={() => setDefaultTags([...defaultTags, newTag])}
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

            {/* <FormSection>
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
            </FormSection> */}
          </Container>
        );
      }}
    />
  );
}
