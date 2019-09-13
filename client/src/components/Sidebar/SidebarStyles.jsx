import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import { ButtonPrimary } from "../../ui/Buttons";
import { Close } from "styled-icons/material/Close";

export const SidebarContainer = styled.div`
  min-width: 260px;
  height: 100%;
  top: 0;
  background: ${props => props.theme.palette.sidebar};
  z-index: 999;
  transition: 0.5s ease-in-out;
  padding: 20px;
  font-size: 13px;

  /* @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    width: 250px;
    box-shadow: none;
    display: block;
  } */
`;

export const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 36px;
  border: 1px solid #e0e0e0;
  background: #fcfcfc;
  border-radius: 4px;
  display: flex;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
  }
`;

export const SearchIcon = styled(Search)`
  color: rgba(75, 71, 75, 0.8);
  position: relative;
  transform: translateY(-50%);
  top: 50%;
  left: 12px;
  margin-right: 16px;
  width: 20px;
`;

export const SearchInput = styled.input`
  position: relative;
  background: transparent;
  border: none;
  font-family: "Rubik";
  font-weight: 300;
  width: 100%;

  &:focus, &:active {
    outline: none;
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
  font-weight: 300;
  line-height: 2em;

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
  border-top: 1px solid ${props => props.theme.palette.border};
  padding: 10px 0;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 20px;
`;

export const SidebarButtonPrimary = styled(ButtonPrimary)`
  font-size: 15px;
`;

export const CloseMenu = styled(Close)`
  padding-left: 0;
  opacity: 0.5;
  cursor: pointer;
  position: relative;
  top: 10px;
`