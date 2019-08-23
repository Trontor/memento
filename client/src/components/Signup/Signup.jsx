import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import {query} from 'apollo-client';
// import gql from "graphql-tag";
import { Formik } from "formik";
import { Input, InputLabel, Error } from "ui/Forms";
import { SubmitButton } from "ui/Buttons";
import { SignupHeader } from "./SignupStyles";
import * as yup from "yup";

import {
  FirstName,
  LastName,
  NameInputContainer,
  SignupContainer
} from "./SignupStyles";

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
        validateOnChange={false}
        validateOnBlur={false}
        render={props => (
          <SignupContainer onSubmit={props.handleSubmit}>
            <SignupHeader>
              Sign up today!
            </SignupHeader>
            <NameInputContainer>
              <FirstName>
                <InputLabel>First Name</InputLabel>
                <Input
                  type="text"
                  name="firstName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstName}
                />
                {props.errors.firstName && props.touched.firstName && (
                  <Error>{props.errors.firstName}</Error>
                )}
              </FirstName>
              <LastName>
                <InputLabel>Last Name</InputLabel>
                <Input
                  type="text"
                  name="lastName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastName}
                />
                {props.errors.lastName && props.touched.lastName && (
                  <Error>{props.errors.lastName}</Error>
                )}
              </LastName>
            </NameInputContainer>
              <InputLabel>Email Address</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.errors.email && props.touched.email && (
                <Error>{props.errors.email}</Error>
              )}
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                name="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && props.touched.password && (
                <Error>{props.errors.password}</Error>
              )}
              <InputLabel>Confirm Password</InputLabel>
              <Input
                type="password"
                name="confirmPassword"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
              />
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <Error>{props.errors.confirmPassword}</Error>
                )}
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </SignupContainer>
        )}
      />
    </>
  );
}
