import styled, { css } from "styled-components";

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

export const Container = styled.div`
  margin: 20px 40px;
  position: relative;
  top: 40px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    top: 0;
    margin: 20px auto 40px auto;
    width: 80%;
  }

`;

export const AlignRight = styled.div`
  margin-left: auto;
  display: inline-block;
`;