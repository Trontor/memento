import React, { Component } from "react";
import "./Signup.css";

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
      <div>
        <div>
          <button className="login">Log In</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="title">
              <h1>Sign up today!</h1>
            </div>
            <div className="name">
              <div className="first">
                <label>First Name </label>
                <input
                  className={
                    formErrors.firstName.length > 0 ? "errorInput" : null
                  }
                  type="text"
                  name="firstName"
                  maxLength="40"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="error">{formErrors.firstName}</span>
                )}
              </div>
              <div className="last">
                <label>Last Name </label>
                <input
                  className={
                    formErrors.firstName.length > 0 ? "errorInput" : null
                  }
                  type="text"
                  name="lastName"
                  maxLength="40"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="error">{formErrors.lastName}</span>
                )}
              </div>
            </div>
            <div>
              <label>Email Address </label>
              <input
                className={formErrors.email.length > 0 ? "errorInput" : null}
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="error">{formErrors.email}</span>
              )}
            </div>
            <div>
              <input
                className={formErrors.password.length > 0 ? "errorInput" : null}
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="error">{formErrors.password}</span>
              )}
            </div>
            <div>
              <input
                className={
                  formErrors.confirmPassword.length > 0 ? "errorInput" : null
                }
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {formErrors.confirmPassword.length > 0 && (
                <span className="error">{formErrors.confirmPassword}</span>
              )}
            </div>
            <div>
              <button type="submit" className="signup">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;


