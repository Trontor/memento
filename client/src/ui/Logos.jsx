import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  /* position: relative; */
  color: ${props => props.theme.palette.text};
  font-size: 40px;
  font-weight: light;
  text-transform: lowercase;
  text-align: center;
  padding: ${props => props.padding || "0"};
  cursor: ${props => (props.pointer ? "pointer" : "default")};
  /* margin-bottom: 1em; */
  font-family: "Quicksand", sans-serif;
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    text-align: left;
    /* padding-left: 50px; */
  }
`;

export const Logo = props => <StyledLogo {...props}>memento</StyledLogo>;
