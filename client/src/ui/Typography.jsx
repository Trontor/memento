import styled, { css } from "styled-components";

export const Header = styled.h1`
  font-size: 28px;
  letter-spacing: 0.01em;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}) {
    font-size: 36px;
  }

  ${({underline}) => underline && css`
    display: inline-block;
    border-bottom: 0.15em solid ${props => props.theme.palette.main};
    padding-bottom: 0.1em;
    margin-bottom: 1em;
  `};
`;