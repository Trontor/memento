import styled, { css, keyframes } from "styled-components";

export const line = keyframes`
  from { width: 0; }
  to { width: 100%;}
`;

// Page heading
export const Header = styled.h1`
  font-size: 20px;
  letter-spacing: 0.01em;
  display: inline-block;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.mobile}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    font-size: 32px;
  }

  ${({ underline }) =>
    underline &&
    css`
      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0.155em;
        background-color:${props => props.theme.palette.main};
        margin-top: 4px;
        padding-bottom: 0.1em;
        margin-bottom: 1em;
        animation: ${line} 0.3s forwards;
        animation-delay: 0.1s;
      }
    `};
`;
