import React, { Component } from "react";
import {
  SignupBackgroundWrapper,
  SignupOrganic,
  LoginBackgroundWrapper,
  LoginOrganic
} from "./BackgroundStyles";

export class SignupBackground extends Component {
  render() {
    return (
      <SignupBackgroundWrapper>
        <SignupOrganic />
        <SignupOrganic />
        <SignupOrganic />
        <SignupOrganic />
        <SignupOrganic />
        <SignupOrganic />
      </SignupBackgroundWrapper>
    );
  }
}

export class LoginBackground extends Component {
  render() {
    return (
      <LoginBackgroundWrapper>
        <LoginOrganic />
        <LoginOrganic />
        <LoginOrganic />
        <LoginOrganic />
      </LoginBackgroundWrapper>
    );
  }
}

export default { SignupBackground, LoginBackground };
