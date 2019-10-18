import React from "react";
import styled from "styled-components";

//Logotype to be used across the site
const StyledLogo = styled.div`
  color: ${props => props.theme.palette.text};
  font-size: ${props => (props.size === "small" ? "24px" : "32px")};
  opacity: 0.9;
  text-transform: lowercase;
  padding: 10px 0;
  cursor: ${props => (props.pointer ? "pointer" : "default")};
  font-family: "Livvic", sans-serif;
  text-align: ${props => (props.center ? "center" : "default")};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin: ${props => (props.size === "small" ? "0 auto" : null)};
    text-align: left;
  }
`;

export const Logo = props => <StyledLogo {...props}>memento</StyledLogo>;
