import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import { LandingLayout, Intro } from "./LandingStyles";
import Signup from "../Signup/Signup";
import { SignupBackground } from "../Background/Background";
import { Logo } from "ui/Logos";

export class Landing extends Component {
  render() {
    return (
      <LandingLayout>
        <Intro>
          <SignupBackground />
          <Logo />
          <Carousel />
        </Intro>
        <Signup />
      </LandingLayout>
    );
  }
}

export default Landing;
