import styled, { css } from "styled-components";

export const Header = styled.h1`
  font-size: 32px;
  letter-spacing: 0.01em;

  ${({underline}) => underline && css`
    display: inline-block;
    border-bottom: 5px solid ${props => props.theme.palette.main};
    padding-bottom: 3px;
    margin-bottom: 1em;
  `};
`;