import React, { Component } from 'react'
import styled from "styled-components"

const Logotype = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-transform: lowercase;
  text-align: center;
  width: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    text-align: left;
  }
`;

export class Logo extends Component {
  render() {
    return (
      <Logotype>Memento</Logotype>
    )
  }
}

export default Logo
