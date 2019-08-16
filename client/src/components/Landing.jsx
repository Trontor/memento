import React, { Component } from 'react'
import styled from "styled-components"

const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export class Landing extends Component {
  render() {
    return (
      <LandingLayout>
        <div>
          Memento
        </div>
        <div>
          Signup
        </div>
      </LandingLayout>
    )
  }
}

export default Landing
