import styled from "styled-components";
import { Menu } from "styled-icons/boxicons-regular/Menu";

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

export const MenuIcon = styled.button`
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

export const CloseMenuIcon = styled.button`
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
