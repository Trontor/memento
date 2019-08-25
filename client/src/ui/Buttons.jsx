import styled from "styled-components";
import { Menu } from "styled-icons/feather/Menu";
import { Close } from "styled-icons/evil/Close";

export const ButtonPrimary = styled.button`
  background: ${props => props.theme.palette.main};
  color: white;
  border: 1px solid ${props => props.theme.palette.main};
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 4px;
  ${props => props.theme.mixins.hoverFade};
  margin-right: 20px;

  &:hover {
    border: 1px solid ${props => props.theme.palette.secondary};
    background: ${props => props.theme.palette.secondary};
    ${props => props.theme.mixins.hoverFade};
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonSecondary = styled.button`
  border: 1px solid ${props => props.theme.palette.main};
  color: ${props => props.theme.palette.main};
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
  font-size: 15px;
  ${props => props.theme.mixins.hoverFade};
`;

export const MenuButton = styled(Menu)`
  margin: 15px;
  background: transparent;
  position: relative;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export const CloseMenuButton = styled(Close)`
  margin: 15px;
  background: transparent;
  color: black;
  position: relative;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;
