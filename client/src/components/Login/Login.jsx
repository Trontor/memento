import React, { Component } from "react";
import styled from "styled-components";
import { FormInput } from "ui/Forms";
import "./Login.css";
import { Link } from "react-router-dom";
import { Logo } from "components/Logo";

const LoginWrapper = styled.div`
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
      <div>
        <Logo />
        <LoginWrapper>
          <h1 className="welcome">Welcome back!</h1>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              placeholder="Email"
              type="text"
              name="email"
              className={formErrors.email.length > 0 ? "errorInput1" : "input"}
              value={this.state.email}
              onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="error1">{formErrors.email}</span>
            )}
            <FormInput
              placeholder="Password"
              type="password"
              name="password"
              className={
                formErrors.password.length > 0 ? "errorInput1" : "input"
              }
              value={this.state.password}
              onChange={this.handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="error1">{formErrors.password}</span>
            )}

            <button type="submit" className="login1">
              Log In
            </button>
          </form>
          <div className="text">
            Don't have an account?{" "}
            <Link to="./Signup" className="link">
              Sign up
            </Link>
          </div>
        </LoginWrapper>
      </div>
    );
  }
}

export default Login;
