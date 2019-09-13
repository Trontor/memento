import styled, { css } from "styled-components";

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  background-color: ${props => props.theme.palette.background};

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}) {
    flex-grow: 1;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    /* position: absolute; */
  }

`;

export const AlignRight = styled.div`
  position: absolute;
  right: 20px;
  display: inline-block;
`;