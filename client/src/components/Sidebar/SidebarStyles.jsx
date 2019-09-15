import styled, {css} from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import { ButtonSecondary } from "../../ui/Buttons";
import { Close } from "styled-icons/material/Close";
import { lighten } from "polished";

export const SidebarContainer = styled.div`
  display: ${props => props.isOpen ? "block" : "none"};
  width: ${props => props.theme.size.sidebar};
  border-right: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  min-height: 100%;
  background: ${props => props.theme.palette.sidebar};
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  font-size: 14px;
  z-index: 999;
  margin-left: -280px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(280px);
      transition: transform 5s ease;
      }
    `}

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: block;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  background: #fcfcfc;
  border-radius: 4px;
  display: flex;
  margin: 20px 0;

`;

export const SearchIcon = styled(Search)`
  color: rgba(75, 71, 75, 0.8);
  position: relative;
  transform: translateY(-50%);
  top: 50%;
  left: 12px;
  margin-right: 16px;
  width: 15px;
`;

export const SearchInput = styled.input`
  position: relative;
  background: transparent;
  border: none;
  font-family: "Rubik";
  width: 100%;

  &:focus, &:active {
    outline: none;
  }

  &:focus ${SearchBar} {
    border-color: ${props => props.theme.palette.main};
  }
`;

export const FamilyListContainer = styled.div`
  h3 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

export const TextList = styled.li`
  list-style-type: none;
  line-height: 30px;

  a {
    color: ${props => props.theme.palette.text};
    &:hover {
      border-bottom: 3px solid ${props => props.theme.palette.main};
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }
`;

export const MenuContainer = styled.div`
  border-top: 1px solid  ${props => lighten(0.65, props.theme.palette.text)};;
  padding: 10px 0;
`;

export const SignOutButton = styled(ButtonSecondary)`
  margin-top: 60px;
  width: 100%;
  height: 32px;
  padding: 0;
`;

export const CloseMenu = styled(Close)`
  color: ${props => props.theme.palette.main};
  cursor: pointer;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;