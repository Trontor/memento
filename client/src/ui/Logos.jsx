import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  color: ${props => props.theme.palette.text};
  font-size: ${props => props.size == "small" ? "24px" : "40px"};
  font-weight: light;
  text-transform: lowercase;
  padding: 10px 0;
  cursor: ${props => (props.pointer ? "pointer" : "default")};
  font-family: "Quicksand", sans-serif;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    margin: ${props => props.size == "small" ? "0 auto" : null};
  }
`;

export const Logo = props => <StyledLogo {...props}>memento</StyledLogo>;
