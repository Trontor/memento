import * as yup from "yup";

import { AlignRight, Container } from "ui/Helpers";
import {
  Error,
  FormHelpText,
  FormSection,
  InputField,
  InstructionLabel,
} from "ui/Forms";

import { ButtonPrimary } from "ui/Buttons";
import { CREATE_NEW_FAMILY } from "mutations/Family";
import { CirclePicker } from "react-color";
import { Formik } from "formik";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { PickerWrapper } from "./CreateFamilyStyles";
import React from "react";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import { useMutation } from "@apollo/react-hooks";

const MAX_FILE_SIZE = 160 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CreateFamilyValidationSchema = yup.object().shape({
  familyName: yup.string().required("Please enter a family name"),
  color: yup.string().required("Please select a color for your family."),
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

const loadingFamilyQuotes = [
  "Creating family...",
  "Assimilating hierarchy...",
  "Forging kinship...",
  "Loading lavishly...",
  "OwO",
];
export default function CreateFamily(props) {
  const [createNewFamily, { data, loading /* error */ }] = useMutation(
    CREATE_NEW_FAMILY,
  );

  const defaultValues = {
    familyName: "",
    color: "",
    file: null,
  };
  if (data && data.createFamily) {
    const { familyId } = data.createFamily;
    props.history.push("/family/" + familyId);
  }
  if (loading) {
    return <JollyLoader quotes={loadingFamilyQuotes} />;
  }

  return (
    <Container>
      <Header underline>Create a New Family</Header>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, actions) => {
          console.log(values);

          const payload = {
            name: values.familyName,
            colour: values.color,
            image: values.file,
          };
          createNewFamily({ variables: { input: payload } });
        }}
        validationSchema={CreateFamilyValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <FormSection>
              {/* Family Group Name */}
              <InstructionLabel>
                What would you like to name your Family group?
              </InstructionLabel>
              <InputField
                placeholder="Enter a cool name for your family"
                type="text"
                name="familyName"
                onChange={props.handleChange}
                value={props.values.familyName}
              />
              {props.errors.familyName && props.touched.familyName && (
                <Error>{props.errors.familyName}</Error>
              )}
              {!props.errors.familyName && (
                <FormHelpText>
                  You'll be able to change this, so no pressure!
                </FormHelpText>
              )}
            </FormSection>

            <FormSection>
              {/* Family Profile Photo */}
              <InstructionLabel>
                Select a display photo for your Family.
              </InstructionLabel>
              {props.values.file ? (
                <div>
                  {props.values.file.name}{" "}
                  <button onClick={() => props.setFieldValue("file", null)}>
                    Remove
                  </button>
                </div>
              ) : (
                <StyledDropzone
                  onFilesAdded={files => props.setFieldValue("file", files[0])}
                />
              )}
              {props.errors.file && props.touched.file && (
                <Error>{props.errors.file}</Error>
              )}
              <FormHelpText>You can upload a photo later.</FormHelpText>
            </FormSection>

            <FormSection>
              {/* Family Group Colour Theme */}
              <InstructionLabel>
                Pick a colour theme for your Family group page.
              </InstructionLabel>
              <PickerWrapper>
                <CirclePicker
                  onChange={color => {
                    props.setFieldValue("color", color.hex);
                  }}
                  color={props.values.color}
                  width="100%"
                />
              </PickerWrapper>

              {props.errors.color ? (
                <Error>{props.errors.color}</Error>
              ) : (
                <FormHelpText>
                  You can adjust the colour anytime you want.
                </FormHelpText>
              )}
            </FormSection>

            <AlignRight>
              <ButtonPrimary type="submit">Create My Family</ButtonPrimary>
            </AlignRight>
          </form>
        )}
      />
    </Container>
  );
}
