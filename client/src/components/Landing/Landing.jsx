import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import { Logo } from "../Logo";
import { LandingLayout, Intro } from "./LandingStyles";
import Signup from "../Signup/Signup";
import { SignupBackground } from "../Background/Background";

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
