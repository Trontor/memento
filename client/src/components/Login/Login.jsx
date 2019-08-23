import React, { Component } from "react";
import { FormHeader } from "ui/Typography";
import { InputContainer, InputField, InputLabel, HelpText } from "ui/Forms";
import { Logo } from "components/Logo";
import {
  ErrorMsg,
  MsgLink
} from "./LoginStyles";
import { ButtonPrimary } from "ui/Buttons";
import { LoginContainer } from "./LoginStyles";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  //validate from errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  //empty form won't be submitted
  Object.values(rest).forEach(val => {
    val === "" && (valid = false);
  });

  return valid;
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (
      name //sign up form validation
    ) {
      default:
        break;
      case "email":
        formErrors.email = value.length < 1 ? "Please enter your email" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 1 ? "Please enter your password" : "";
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log("Form Submitted");
    } else {
      console.error("Form Invalid");
    }
  }

  render() {
    const { formErrors } = this.state;
    return (
      <>
        <Logo />
        <LoginContainer>
          <FormHeader>Welcome back!</FormHeader>
          <form onSubmit={this.handleSubmit}>
            <InputContainer>
              <InputLabel>Email</InputLabel>
              <InputField
                valid={formErrors.email.length > 0}
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <ErrorMsg>{formErrors.email}</ErrorMsg>
              )}
            </InputContainer>

            <InputContainer>
              <InputLabel>Password</InputLabel>
              <InputField
                valid={formErrors.password.length > 0}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <ErrorMsg>{formErrors.password}</ErrorMsg>
              )}
            </InputContainer>

            <ButtonPrimary>Login</ButtonPrimary>
            <HelpText>
              Don't have an account?
              <MsgLink to="./Signup"> Sign up</MsgLink>
            </HelpText>
          </form>
        </LoginContainer>
      </>
    );
  }
}

export default Login;
