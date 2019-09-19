import React from "react";
import { Header } from "ui/Typography";
import {
  Error,
  InputField,
  InputLabel,
  HelpText,
  InputSection,
} from "ui/Forms";
import { MsgLink } from "./LoginStyles";
import { ButtonPrimary } from "ui/Buttons";
import { LoginContainer } from "./LoginStyles";
import * as yup from "yup";
import { Formik } from "formik";
import { LOGIN } from "mutations/Authentication";
import { useMutation } from "@apollo/react-hooks";
import { Logo } from "ui/Logos";
import { Spinner } from "ui/Loaders";

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Password is required"),
});

/**
 * To set default values for easy login during development, set the following
 * environment variables to your own memento test login details.
 * Otherwise, it will default to an empty string.
 */
const defaultValues = {
  email: process.env.REACT_APP_DEFAULT_LOGIN_EMAIL || "",
  password: process.env.REACT_APP_DEFAULT_LOGIN_PASSWORD || "",
};

export default function Login(props) {
  const processAuthentication = data => {
    // Extract JWT token from response using ES6 destructuring
    const { token } = data.login;
    // Store the token to localStorage, which is NOT a secure way to store
    // sensitive information, but it is easy. See here:
    // https://www.rdegges.com/2018/please-stop-using-local-storage/
    localStorage.setItem("AUTH-TOKEN", token);
    props.history.push("/dashboard");
  };

  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: processAuthentication,
  });
  let loginErrors = [];

  if (localStorage.getItem("AUTH-TOKEN")) {
    props.history.push("/dashboard");
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    loginErrors = error.graphQLErrors.map(gqlError => gqlError.message.message);
  }
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }

  return (
    <>
      <Logo></Logo>

      <LoginContainer>
        <Header underline>Welcome back!</Header>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, actions) => {
            login({ variables: { input: { ...values } } });
          }}
          validationSchema={LoginValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {/* Email Field */}
              <InputSection>
                <InputLabel>Email</InputLabel>
                <InputField
                  type="text"
                  name="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />
                {props.errors.email && props.touched.email && (
                  <Error>{props.errors.email}</Error>
                )}
              </InputSection>
              {/* Password Field */}
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
              {loginErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
              <ButtonPrimary type="submit" spacing>
                Login
              </ButtonPrimary>
              <HelpText>
                Don't have an account?
                <MsgLink to="/"> Sign up</MsgLink>
              </HelpText>
            </form>
          )}
        />
      </LoginContainer>
    </>
  );
}
