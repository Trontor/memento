import React, { Component } from 'react'
import Carousel from './Carousel'
import styled from "styled-components"
import Logo from './Logo';
import { Link } from "react-router-dom";

const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Intro = styled.section`
  width: 100%;
  height: 100%;
  border-right: 1px solid grey;
  padding: 20px;
`;


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
