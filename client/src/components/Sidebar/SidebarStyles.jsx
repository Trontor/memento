import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import { ButtonSecondary } from "../../ui/Buttons";
import { Close } from "styled-icons/material/Close";

export const SidebarContainer = styled.div`
  display: none;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: block;
    width: ${props => props.theme.size.sidebar};
    min-height: 100%;
    background: ${props => props.theme.palette.sidebar};
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transition: 0.5s ease-in-out;
    padding: 20px;
    font-size: 13px;
    z-index: 999;
  }
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
  height: 30px;
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


export const SignOutButton = styled(ButtonSecondary)`
  margin-top: 60px;
  width: 100%;
  height: 32px;
  padding: 0;
`;

export const CloseMenu = styled(Close)`
  padding-left: 0;
  opacity: 0.5;
  cursor: pointer;
  position: relative;
  top: 10px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`