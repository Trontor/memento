import { Intro, LandingLayout } from "./LandingStyles";
import React, { Component } from "react";

import Carousel from "../Carousel/Carousel";
import { Logo } from "ui/Logos";
import Signup from "../Signup/Signup";
import { SignupBackground } from "./Background";

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
