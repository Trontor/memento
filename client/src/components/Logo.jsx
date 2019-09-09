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

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    text-align: left;
    left: 50px;
  }
`;

const LogoStyle = styled.span`
  display: block;
  float: left;
  color: ${props => props.theme.palette.text};
  font-size: 25px;
  text-transform: lowercase;
  width: 35%;
  position: relative;
  margin: 5px 15px;

  @media screen and (width: ${props => props.theme.breakpoints.tabletLandscape}),
    (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) and (max-width: ${props =>
      props.theme.breakpoints.desktop}) {
    font-size: 20px;
    margin: 5px 15px 0 5px;
  }
`;

export class Logo extends Component {
  render() {
    return <Logotype to="/">Memento</Logotype>;
  }
}

export class MiniLogo extends Component {
  render() {
    return <LogoStyle>Memento</LogoStyle>;
  }
}

export default { Logo, MiniLogo };
