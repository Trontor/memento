import React, { Component } from "react";
import { FormInput } from "ui/Forms";
import { Logo } from "components/Logo";
import { SubmitButton } from "ui/Buttons";
import {
  LoginLayout,
  Intro,
  LoginWrapper,
  TitleWrapper,
  ErrorMsg,
  Message,
  MsgLink
} from "./LoginStyles";

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
      <LoginLayout>
        <Intro>
          <Logo />
        </Intro>
        <TitleWrapper>
          <h1>Welcome back!</h1>
        </TitleWrapper>
        <form onSubmit={this.handleSubmit}>
          <LoginWrapper>
            <FormInput
              valid={formErrors.email.length > 0}
              placeholder="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <ErrorMsg>{formErrors.email}</ErrorMsg>
            )}
            <FormInput
              valid={formErrors.password.length > 0}
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {formErrors.password.length > 0 && (
              <ErrorMsg>{formErrors.password}</ErrorMsg>
            )}
            <SubmitButton>Login</SubmitButton>
            <Message>
              Don't have an account?
              <MsgLink to="./Signup"> Sign up</MsgLink>
            </Message>
          </LoginWrapper>
        </form>
      </LoginLayout>
    );
  }
}

export default Login;
