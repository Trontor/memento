import React from "react";
// import { useQuery } from "@apollo/react-hooks";
// import {query} from 'apollo-client';
// import gql from "graphql-tag";
import { Formik } from "formik";
import {
  InputContainer,
  InputField,
  InputLabel,
  Error,
  AnimateLabel
} from "ui/Forms";
import { ButtonPrimary } from "ui/Buttons";
import { FormHeader } from "ui/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import gql from "graphql-tag";
import { NameInputContainer, SignupContainer } from "./SignupStyles";
import { HelpText } from "ui/Forms";
import { useMutation } from "@apollo/react-hooks";

const defaultValues = {
  firstName: "John",
  lastName: "Doe",
  email: "Test123@gmail.com",
  password: "IOUHJWRFN",
  confirmPassword: "IOUHJWRFN"
};

// const defaultValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: ""
// };

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

const SIGNUP = gql`
  mutation($input: UserSignupInput!) {
    signup(input: $input) {
      token
      user {
        email
        firstName
        lastName
        id
      }
    }
  }
`;
export default function Signup() {
  /**
   * Creates a GraphQL Mutation Hook
   * https://apollographql.com/docs/react/essentials/mutations/
   *
   * The hook is passed the SIGNUP constant, which contains our GraphQL mutation
   * and within the mutation, a variable is denoted: $input. We will fill this
   * in later, when we call the mutation.
   *
   * The hook returns a tuple, with a 'mutate' function in the first entry,
   * in this case 'signup'. You can see this used in the Formik onSubmit
   * callback.
   *
   * The second entry is an object, with three properties of interest to us,
   *    data:     The data returned from your mutation.
   *    loading:  A boolean indicating whether the mutation is in flight
   *    error:    Any errors returned from the mutation
   *
   */
  const [signup, { loading, data, error }] = useMutation(SIGNUP);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }
  if (error) {
    return (
      <div>
        {error.graphQLErrors
          .map(err => err.message)
          .map(message => (
            <div>{message}</div>
          ))}
      </div>
    );
  }
  return (
    <>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, actions) => {
          signup({ variables: { input: { ...values } } });
        }}
        validationSchema={SignupValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        render={props => (
          <SignupContainer onSubmit={props.handleSubmit}>
            <FormHeader>Sign up today!</FormHeader>
            <NameInputContainer>
              <InputContainer>
                <InputLabel>First Name</InputLabel>
                <InputField
                  type="text"
                  name="firstName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.firstName}
                  filled={props.values.firstName.length > 0}
                  onfocus={AnimateLabel}
                />
                {props.errors.firstName && props.touched.firstName && (
                  <Error>{props.errors.firstName}</Error>
                )}
              </InputContainer>

              <InputContainer>
                <InputLabel>Last Name</InputLabel>
                <InputField
                  type="text"
                  name="lastName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.lastName}
                />
                {props.errors.lastName && props.touched.lastName && (
                  <Error>{props.errors.lastName}</Error>
                )}
              </InputContainer>
            </NameInputContainer>

            <InputContainer>
              <InputLabel>Email Address</InputLabel>
              <InputField
                type="email"
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.errors.email && props.touched.email && (
                <Error>{props.errors.email}</Error>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>Password</InputLabel>
              <InputField
                type="password"
                name="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && props.touched.password && (
                <Error>{props.errors.password}</Error>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>Confirm Password</InputLabel>
              <InputField
                type="password"
                name="confirmPassword"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
              />
              {props.errors.confirmPassword && (
                <Error>{props.errors.confirmPassword}</Error>
              )}
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
