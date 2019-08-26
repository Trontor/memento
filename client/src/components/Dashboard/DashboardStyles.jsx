import styled from "styled-components";

export const DashboardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
`;

export const Navbar = styled.header`
  height: 60px;
  display: grid;
  grid-template-columns: 10% 90%;
`;

export const TextWrapper = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  text-align: center;
  color: ${props => props.theme.palette.text};

  h2 {
    margin-bottom: 25px;
  }

  button {
    margin: 10px;
    width: 100%;

    &:hover {
      cursor: pointer;
    }

    @media screen and (min-width: ${props =>
        props.theme.breakpoints.tabletPortrait}) {
      width: 50%;
    }
  }
`;

export const SearchBar = styled.input`
  display: ${props => (props.menuClick ? "none" : "block")};
  margin-top: 17px;
  margin-left: ${props => (props.isOnSidebar ? "25px" : "10px")};
  width: 90%;
  height: 40px;
  padding: 10px;
  background: ${props => (props.isOnSidebar ? "white" : "lightgray")};
  border-radius: 20px;
  border: none;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
  @media screen and (max-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    margin-left: 40px;
    width: 80%;
  }
`;

export const Sidebar = styled.div`
  top: 0;
  width: 100%;
  height: 80%;
  position: absolute;
  background: ${props => props.theme.palette.sidebar};
  z-index: 999;
  left: ${props => (props.menuClick ? "0" : "-100%")};
  transition: left 0.3s ease-in-out;
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    width: 40%;
  }
`;

export const SidebarItem = styled.li`
  margin-top: 10px;
  font-size: 16px;
`;
