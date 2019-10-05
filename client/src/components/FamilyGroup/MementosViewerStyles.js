import styled from "styled-components";

export const MementoCardColumns = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.size.gutterWidth};
  padding: ${props => props.theme.size.gutterWidth};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    display: block;
    padding: 0;
  }
`