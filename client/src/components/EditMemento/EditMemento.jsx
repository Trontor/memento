import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Container } from "ui/Helpers";
import { FormSection, Error, InstructionLabel } from "ui/Forms";
import EditInput from "components/EditInput/EditInput";
import { Header } from "ui/Typography";
import {
  NewTag,
  Tag,
  TagsContainer,
} from "../UploadMemento/UploadMementoStyles";
import { AlignRight } from "ui/Helpers";
import Select from "react-select";
import DateSelector from "components/DateSelector/DateSelector";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";

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
  return (
    <Formik
      //initialValues={initialFormValues}
      //validationSchema={editMementoValidationSchema}
      //onChange={}
      render={props => {
        // console.log(props);
        return (
          <Container>
            <Header underline>Edit Memento</Header>

            <FormSection>
              <EditInput
                name="title"
                value={props.values.firstName}
                inputLabel="Title"
                onChange={props.handleChange}
              />
            </FormSection>
            <FormSection>
              <EditInput
                name="description"
                //value={props.values.firstName}
                inputLabel="Description"
                //onChange={props.handleChange}
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
              {/* {props.errors.date && props.touched.date && (
                <Error>{props.errors.date}</Error>
              )} */}
            </FormSection>

            <FormSection>
              <InstructionLabel>Tag People:</InstructionLabel>
              <Select
                isClearable
                placeholder="Select family members.."
                //styles={customDropdown}
                isMulti
                create
                name="memberTags"
                // //value={familyMemberOptions.filter(m =>
                //   props.values.memberTags.includes(m.value),
                // )}
                // onChange={members => {
                //   const memberIDs = !members ? [] : members.map(m => m.value);
                //   props.setFieldValue("memberTags", memberIDs);
                // }}
                // options={familyMemberOptions}
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
                //value={props.values.firstName}
                inputLabel="Add Location:"
                //onChange={props.handleChange}
              />
              {/* {props.errors.location && props.touched.location && (
                <Error>{props.errors.location}</Error>
              )} */}
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
