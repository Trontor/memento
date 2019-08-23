import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import {query} from 'apollo-client';
// import gql from "graphql-tag";
import { Formik } from "formik";
import { InputContainer, InputField, InputLabel, Error } from "ui/Forms";
import { ButtonPrimary } from "ui/Buttons";
import { FormHeader } from "ui/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { NameInputContainer, SignupContainer } from "./SignupStyles";
import { HelpText } from "ui/Forms";
import { AnimateLabel } from "ui/Forms";

// const defaultValues = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "Test123@gmail.com",
//   password: "IOUHJWRFN",
//   confirmPassword: "IOUHJWRFN"
// };

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(2, "First name too short"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(2, "Last name is too short"),
  email: yup
    .string()
    .email("Please enter your email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required")
});

export default function Signup() {
  return (
    <>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, actions) => {}}
        validationSchema={SignupValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        render={props => (
          <SignupContainer onSubmit={props.handleSubmit}>
            <FormHeader>Sign up today!</FormHeader>
            <NameInputContainer>
              <InputContainer>
                <InputField
                  type="text"
                  name="firstName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstName}
                  filled={props.values.firstName.length > 0}
                  onfocus={AnimateLabel}
                />
                <InputLabel>First Name</InputLabel>
                {props.errors.firstName && props.touched.firstName && (
                  <Error>{props.errors.firstName}</Error>
                )}
              </InputContainer>
              <InputContainer>
                <InputField
                  type="text"
                  name="lastName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastName}
                />
                <InputLabel>Last Name</InputLabel>
                {props.errors.lastName && props.touched.lastName && (
                  <Error>{props.errors.lastName}</Error>
                )}
              </InputContainer>
            </NameInputContainer>
            <InputContainer>
              <InputField
                type="email"
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              <InputLabel>Email Address</InputLabel>
              {props.errors.email && props.touched.email && (
                <Error>{props.errors.email}</Error>
              )}
            </InputContainer>
            <InputContainer>
              <InputField
                type="password"
                name="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              <InputLabel>Password</InputLabel>
              {props.errors.password && props.touched.password && (
                <Error>{props.errors.password}</Error>
              )}
              </InputContainer>
              <InputContainer>
                <InputField
                  type="password"
                  name="confirmPassword"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.confirmPassword}
                />
                <InputLabel>Confirm Password</InputLabel>
                {props.errors.confirmPassword &&
                    <Error>{props.errors.confirmPassword}</Error>
                  }
            </InputContainer>
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
            <HelpText>
              Already have an account? <Link to="/login">Log in</Link>
            </HelpText>
          </SignupContainer>
        )}
      />
    </>
  );
}
