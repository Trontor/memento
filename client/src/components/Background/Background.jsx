import React, { Component } from "react";
import { SignupBackgroundWrapper, SignupOrganic } from "./BackgroundStyles";

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

export default SignupBackground;
