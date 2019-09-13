import React from "react";
import { Header } from "ui/Typography";
import { Container } from "ui/Helpers";
import {
  InstructionLabel,
  InputField,
  FormHelpText,
  FormSection,
  Error
} from "ui/Forms";
import { CirclePicker } from "react-color";
import { PickerWrapper } from "./CreateFamilyStyles";
import { StyledDropzone } from "components/FileDropzone";
import { ButtonPrimary } from "ui/Buttons";
import { AlignRight } from "ui/Helpers";
import { Formik } from "formik";

import * as yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_NEW_FAMILY } from "mutations/Family";

const CreateFamilyValidationSchema = yup.object().shape({
  familyName: yup.string().required("Please enter a family name"),
  color: yup.string().required("Please select a color for your family.")
});

export default function CreateFamily() {
  const [createNewFamily, { data, error, loading }] = useMutation(
    CREATE_NEW_FAMILY
  );
  const defaultValues = {
    familyName: "",
    color: ""
  };
  return (
    <Container>
      <Header underline>Create a New Family</Header>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values));
          const payload = {
            name: values.familyName,
            colour: values.color
          };
          createNewFamily({ variables: { input: payload } });
        }}
        validationSchema={CreateFamilyValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <FormSection>
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
              <InstructionLabel>
                Select a display photo for your Family.
              </InstructionLabel>
              <StyledDropzone />
              <FormHelpText>You can upload a photo later.</FormHelpText>
            </FormSection>

            <FormSection>
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
