import { MenuAltLeft } from "styled-icons/boxicons-regular/MenuAltLeft";
import { lighten } from "polished";
import styled from "styled-components";

export const NavBar = styled.div`
  height: 50px;
  border-bottom: 1px solid ${props => lighten(0.68, props.theme.palette.text)};
  position: fixed;
  width: 100%;
  background-color: ${props => props.theme.palette.background};
  z-index: 997;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;

export const HamburgerMenu = styled(MenuAltLeft)`
  cursor: pointer;
  color: ${props => props.theme.palette.main};
  margin: 10px 0 0 30px;
  width: 30px;
`;

export const ModalBackground = styled.div`
  background-color: ${props => props.theme.palette.background};
  opacity: 0.8;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;
