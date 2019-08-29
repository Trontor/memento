import styled from "styled-components";

export const DashboardContainer = styled.div`
  top: 10%;
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    display: grid;
    grid-template-columns: 30% 70%;
    height: 100%;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
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
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    position: relative;
    width: 60%;
  }
`;
