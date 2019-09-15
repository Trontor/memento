import styled from "styled-components";
import { MenuAltLeft } from "styled-icons/boxicons-regular/MenuAltLeft";
import { lighten } from "polished";

export const NavBar = styled.div`
  height: 50px;
  border-bottom: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  position: fixed;
  width: 100%;
  background-color: ${props => lighten(0.65, props.theme.palette.background)};

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`

export const HamburgerMenu = styled(MenuAltLeft)`
  cursor: pointer;
  color: ${props => props.theme.palette.main};
  margin: 10px 0 0 30px;
  width: 30px;
`