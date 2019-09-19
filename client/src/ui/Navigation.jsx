import styled, { css } from "styled-components";

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
