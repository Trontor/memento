import styled, { css } from "styled-components";

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  width: 100%;
  padding: 30px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    width: 70%;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    width: 50%;
  }
`;
