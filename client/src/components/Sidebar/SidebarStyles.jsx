import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import { lighten } from "polished";
import { ButtonPrimary } from "../../ui/Buttons";

export const SidebarContainer = styled.div`
  display: ${props => (props.menuClick ? "block" : "none")};
  position: absolute;
  height: 100%;
  top: 0;
  width: 100%;
  background: ${props => lighten(0.05, props.theme.palette.sidebar)};
  z-index: 999;
  box-shadow: 5px 10px lightgrey;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) {
    width: 22%;
    box-shadow: none;
    display: block;
  }
`;

export const SearchHeader = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  margin-top: 10px;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    display: flex;
  }
`;

export const SearchBar = styled.div`
  width: 90%;
  float: right;
  height: 45px;
  margin: 10px 0 0 5px;
  border: 1px solid #e0e0e0;
  background: #fcfcfc;
  border-radius: 5px;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    float: left;
    margin: 10px 15px;
  }
`;

export const SearchIcon = styled(Search)`
  color: rgba(75, 71, 75, 0.8);
  margin: 8px 0 0 10px;
`;

export const SearchInput = styled.input`
  position: absolute;
  background: transparent;
  border: none;
  margin-top: 7px;
  padding: 5px;
  font-family: "Rubik";
  font-weight: 300;
  font-size: 16px;
  font-style: normal;
  line-height: 19px;

  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export const FamilyListContainer = styled.div`
  width: 85%;
  height: 35%;
  margin: 0px 15px 0px 25px;
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) and (max-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) {
    height: 30%;
  }
`;

export const TextList = styled.li`
  margin-top: 10px;
  list-style-type: none;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  a {
    color: ${props => props.theme.palette.text};
    &:hover {
      border-bottom: 3px solid ${props => props.theme.palette.main};
    }
  }
`;

export const MenuContainer = styled.div`
  width: 85%;
  margin: 10px 15px 15px 25px;
  padding-top: 10px;
  border-top: 1px solid ${props => props.theme.palette.border};
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 85%;

  margin: 10px 15px 15px 10px;
`;

export const SidebarButtonPrimary = styled(ButtonPrimary)`
  float: right;
  font-size: 15px;
  margin-right: 0;
  @media screen and (width: ${props => props.theme.breakpoints.tabletLanscape}),
    (min-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) and (max-width: ${props =>
      props.theme.breakpoints.desktop}) {
    font-size: 12px;
  }
`;
