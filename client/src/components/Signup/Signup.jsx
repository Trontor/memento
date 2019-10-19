import * as yup from "yup";

import {
  Error,
  ErrorBanner,
  HelpText,
  InputField,
  InputLabel,
  InputSection,
} from "ui/Forms";

import { ButtonPrimary } from "ui/Buttons";
import { FormWrapper } from "ui/Helpers";
import { Formik } from "formik";
import { Header } from "ui/Typography";
import { Link } from "react-router-dom";
import { Logo } from "ui/Logos";
import {
  NameInputContainer,
} from "./SignupStyles";
import { PageHeader } from "components/Home/HomeStyles";
import React from "react";
import { SIGNUP } from "mutations/Authentication";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

const defaultValues = {
  firstName: "Jane",
  lastName: "Doe",
  email: `testaccount${Math.trunc(Math.random() * 1000000)}@email.com`,
  password: "compl14n7Pa$$w0rd",
  confirmPassword: "compl14n7Pa$$w0rd",
};

/**
 * Uses a validation libary, called 'Yup' to easily specify a validation schema.
 * This is used in tandem with Formik, which has first class support for Yup
 * through its prop, validationSchema - which you can see below.
 */
const SignupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(2, "First name is too short ;("),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(2, "Last name is too short :("),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Your passwords do not match")
    .required("Please confirm your password"),
});

const Signup = props => {
  /**
   * Processes a successful signup mutation by saving the resulting token
   * and re-routing to the dashboard.
   *
   * @param {Object} data Mutation result of the form:
   * "signup": {
   *     "token": "<token string>",
   *     "user": {
   *         "firstName": "<first name>",
   *         "lastName": "<last name>",
   *         "userId": "userId
   *     }
   *   }
   */
  const processAuthentication = data => {
    // Extract JWT token from response using ES6 destructuring
    const { token } = data.signup;
    // Store the token to localStorage, which is NOT a secure way to store
    // sensitive information, but it is easy. See here:
    // https://www.rdegges.com/2018/please-stop-using-local-storage/
    localStorage.setItem("AUTH-TOKEN", token);
    props.history.push("/dashboard");
  };

  if (localStorage.getItem("AUTH-TOKEN")) {
    console.log(props);

    props.history.push("/dashboard");
  }
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
  const [signup, { loading, data, error }] = useMutation(SIGNUP, {
    // A MutationOption that fired when the mutation is completed succesfully
    onCompleted: processAuthentication,
  });

  let signUpErrors = [];
  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }

  if (error) {
    signUpErrors = error.graphQLErrors.map(
      gqlError => gqlError.message.message,
    );
  }

  return (
    <>
      <PageHeader>
        <Logo pointer center onClick={() => props.history.push("/")}/>
      </PageHeader>
      <FormWrapper>
        <Header underline>Sign up today!</Header>
        {signUpErrors.length > 0 && (
          <ErrorBanner>
          {signUpErrors.map(error => (
            <div>{error}</div>
          ))}
          </ErrorBanner>
        )}
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, actions) => {
            const { confirmPassword, ...inputValues } = values;
            signup({ variables: { input: inputValues } });
          }}
          validationSchema={SignupValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          render={props => (
            <form onSubmit={props.handleSubmit}>

              <NameInputContainer>
                <InputSection>
                  <InputLabel>First Name</InputLabel>
                  <InputField
                    type="text"
                    name="firstName"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.firstName}
                    filled={props.values.firstName.length > 0}
                  />
                  {props.errors.firstName && props.touched.firstName && (
                    <Error>{props.errors.firstName}</Error>
                  )}
                </InputSection>

                <InputSection>
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
                </InputSection>
              </NameInputContainer>

              <InputSection>
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
              </InputSection>

              <InputSection>
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
              </InputSection>

              <InputSection>
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
              </InputSection>
              <ButtonPrimary type="submit" spacing="true">
                Sign Up
              </ButtonPrimary>
              <HelpText>
                Already have an account? <Link to="/login">Log in</Link>
              </HelpText>
            </form>
          )}
        />
      </FormWrapper>
    </>
  );
};
export default withRouter(Signup);
