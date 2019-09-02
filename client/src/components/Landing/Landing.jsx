import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import { Logo } from "../Logo";
import { LandingLayout, Intro } from "./LandingStyles";
import Signup from "../Signup/Signup";
import Background from "../Background/Background";

export class Landing extends Component {
  render() {
    return (
      <LandingLayout>
        <Intro>
          <Background />
          <Logo />
          <Carousel />
        </Intro>
        <Signup />
      </LandingLayout>
    );
  }
}

export default Landing;
