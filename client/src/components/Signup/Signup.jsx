import React, { Component } from "react";
import { Buttons } from "../../ui/Buttons";
import { FormInput } from "ui/Forms";
import {
  SignupLayout,
  Intro,
  TitleWrapper,
  SignupWrapper,
  NameWrapper,
  ErrorMsg
} from "./SignupStyles";

const emailRegex = RegExp(
  //valid email regex
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passRegex = RegExp(/^(?=.*[A-Z])[0-9a-zA-Z]{5,}$/); //valid password regex

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

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
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
      case "firstName":
        formErrors.firstName =
          value.length < 1 ? "Please enter your first name" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 1 ? "Please enter your last name" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        if (passRegex.test(value)) {
          if (
            formErrors.password !== this.state.confirmPassword &&
            this.state.confirmPassword !== ""
          ) {
            formErrors.confirmPassword = "Please confirm your password";
          }
          formErrors.password = "";
        } else {
          formErrors.password =
            "Your password must contain at least 6 characters and 1 uppercase letter";
        }
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value === this.state.password ? "" : "Please confirm your password";

        break;
    }
    this.setState({ formErrors, [name]: value });
    //, () => console.log(this.state)
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
      <SignupLayout>
        <Intro>
          <Buttons>Insert Button here</Buttons> {/*login button*/}
        </Intro>
        <TitleWrapper>
          <h1>Sign up today!</h1> {/*title*/}
        </TitleWrapper>
        <form onSubmit={this.handleSubmit}>
          <SignupWrapper>
            <NameWrapper>
              {" "}
              {/*first name and last name*/}
              <FormInput
                attributes="firstName"
                valid={formErrors.firstName.length > 0}
                placeholder="First Name"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <FormInput
                attributes="lastName"
                valid={formErrors.lastName.length > 0}
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </NameWrapper>
            <NameWrapper>
              {" "}
              {/*error message for name*/}
              {formErrors.firstName.length > 0 && (
                <ErrorMsg>{formErrors.firstName}</ErrorMsg>
              )}
              {formErrors.lastName.length > 0 && (
                <ErrorMsg attributes="lastName">{formErrors.lastName}</ErrorMsg>
              )}
            </NameWrapper>
            <FormInput /*email, password and confirm password */
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
            <FormInput
              valid={formErrors.confirmPassword.length > 0}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={this.state.confirmPpassword}
              onChange={this.handleChange}
            />
            {formErrors.confirmPassword.length > 0 && (
              <ErrorMsg>{formErrors.confirmPassword}</ErrorMsg>
            )}
            <Buttons type="submit">Insert Button here</Buttons>{" "}
            {/*  submit button */}
          </SignupWrapper>
        </form>
      </SignupLayout>
    );
  }
}

export default Signup;
