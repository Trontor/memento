import styled, { css } from "styled-components";

import { ArrowBack } from "styled-icons/material/ArrowBack";
import { lighten } from "polished";

export const MenuContainer = styled.div`
  display: flex;
  box-shadow: inset 0 -1px 0 ${props => lighten(0.6, props.theme.palette.text)};
  width: 100%;
  justify-content: center;
`;

export const MenuTabs = styled.div`
  cursor: pointer;
  padding: 12px;
  font-size: 18px;
  font-family: "Livvic", sans-serif;
  font-weight: 500;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: ${props => lighten(0.3, props.theme.palette.text)};

  ${({ active }) =>
    active &&
    css`
      box-shadow: inset 0 -3px 0 ${props => props.theme.palette.main};
      border-color: ${props => props.theme.palette.main};
      color: ${props => props.theme.palette.text};
    `};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.desktopLarge}) {
    max-width: 380px;
  }
`;

export const SettingsHeader = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin-bottom: 50px;
`;

export const BackToView = styled.button`
  cursor: pointer;
  opacity: 0.6;
  padding: 0;
  display: flex;
  align-items: center;
  justify-items: left;
  transform: translateY(2px);

  &:hover {
    opacity: 1;
  }

  span {
    display: none;
    font-size: 12px;

    @media screen and (min-width: ${props =>
    props.theme.breakpoints.tabletPortrait}) {
      display: block;
    }
  }
`;

export const BackButton = styled(ArrowBack)`
  width: 30px;
  height: 30px;
`