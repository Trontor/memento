import styled, { css } from "styled-components";

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

export const Container = styled.div`
  width: 100%;
  padding: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}) {
    width: 600px;
  }

`;