import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";
import Logo from "../Logo";

export const SidebarContainer = styled.div`
  display: ${props => (props.menuClick ? "none" : "block")};
  position: absolute;
  height: 100%;
  top: 0;
  width: 100%;
  background: ${props => props.theme.palette.sidebar};
  z-index: 999;
  box-shadow: 5px 10px gray;
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    width: 414px;
  }
`;

export const SearchHeader = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  margin-top: 10px;
`;

export const SearchBar = styled.div`
  width: 90%;
  float: right;
  height: 45px;
  margin: 10px 0 0 5px;
  border: 1px solid #e0e0e0;
  background: #fcfcfc;
  border-radius: 5px;
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
  border-bottom: 1px solid ${props => props.theme.palette.border};
`;

export const TextList = styled.li`
  margin-top: 10px;
  list-style-type: none;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
`;

export const MenuContainer = styled.div`
  width: 85%;
  margin: 0px 15px 0px 25px;
  padding: 15px 0 15px 0;
`;

export const SettingContainer = styled.div`
  width: 85%;
  margin: 0px 15px 0px 25px;
  border-top: 1px solid ${props => props.theme.palette.border};
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 35px;
`;

export const SmallLogo = styled(Logo)`
  font-size: 5px;
`;
