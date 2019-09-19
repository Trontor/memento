import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logotype = styled(Link)`
  display: block;
  color: ${props => props.theme.palette.text};
  font-size: 40px;
  font-weight: light;
  text-transform: lowercase;
  text-align: center;
  width: 100%;
  position: relative;
  top: 40px;
  margin-bottom: 1em;
  font-family: "Quicksand", sans-serif;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    text-align: left;
    left: 50px;
  }
`;

const LogoStyle = styled.span`
  color: ${props => props.theme.palette.text};
  font-size: 24px;
  text-transform: lowercase;
  position: relative;
  font-family: "Quicksand", sans-serif;
`;

class Logo extends Component {
  render() {
    return <Logotype to="/">Memento</Logotype>;
  }
}

class MiniLogo extends Component {
  render() {
    return <LogoStyle>Memento</LogoStyle>;
  }
}
