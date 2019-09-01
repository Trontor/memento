import styled, { css } from "styled-components";
import { ButtonSecondary } from "ui/Buttons";
import { lighten, darken } from "polished";
import { InputField } from 'ui/Forms';


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

export const FamilyGroupName = styled.span`
  font-style: italic;
  color: ${props => darken(0.1, props.theme.palette.main)};
`;

export const EmailInvite = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DeleteButton = styled.button`
  color: ${props => lighten(0.5, props.theme.palette.text)};

  &:hover {
    color: ${props => lighten(0.3, props.theme.palette.text)};
  }
`;

export const EmailsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  margin-bottom: 10px;

  input {
    font-size: 16px;
  }
`;