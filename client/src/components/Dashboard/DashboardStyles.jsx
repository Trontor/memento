import styled from "styled-components";

export const Navbar = styled.header`
  height: 60px;
  display: grid;
  grid-template-columns: 10% 90%;
`;

export const TextWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  text-align: center;
  padding: 25px;
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
