import styled, { css } from "styled-components";
import { ButtonSecondary } from "ui/Buttons";

export const FamilyGroup = styled(ButtonSecondary)`
  display: block;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  ${({selected}) => selected && css`
    background-color: ${props => props.theme.palette.main};
    color: white;
  `};

  /* @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}) {
   width: 50%;
  } */
`;
