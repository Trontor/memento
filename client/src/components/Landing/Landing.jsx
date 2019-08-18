import React, { Component } from "react"
import { Link } from "react-router-dom"
import Carousel from "../Carousel/Carousel"
import Logo from "../Logo";
import { LandingLayout, Intro } from "./LandingStyles"

export class Landing extends Component {
  render() {
    return (
      <LandingLayout>
        <Intro>
          <Logo/>
          <Carousel/>
        </Intro>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </LandingLayout>
    )
  }
}

export default Landing
