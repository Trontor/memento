import styled from "styled-components";
import { SearchBar, SearchIcon, SearchInput } from "../Sidebar/SidebarStyles";
import { Bookmark } from "styled-icons/boxicons-solid/Bookmark";

export const BookmarksSearchBar = styled(SearchBar)`
  height: 50px;
  border: 1px solid ${props => props.theme.palette.main};
  border-radius: 4px;
`;

export const BookmarksSearchIcon = styled(SearchIcon)`
  width: 25px;
`;

export const BookmarksSearchInput = styled(SearchInput)`
  font-size: 16px;
`;

export const BookmarksWrapper = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

export const Item = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  height: 250px;
  margin: 10px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const Description = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  background: ${props => props.theme.palette.main};
  color: white;
  padding: 0 10px;
`;

export const BookmarksIcon = styled(Bookmark)`
  color: white;
  width: 35px;
  margin-left: 175px;
  margin-top: -4px;
  cursor: pointer;
`;
