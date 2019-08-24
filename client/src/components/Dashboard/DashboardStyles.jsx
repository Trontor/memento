import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Navbar = styled.div`
  height: 70px;
  background: skyblue;
`;

export const TextWrapper = styled.text`
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
  margin-top: 15px;
  margin-left: 15px;
  width: 90%;
  padding: 10px;
  background: lightgray;
  border-radius: 15px;
  border: none;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;
