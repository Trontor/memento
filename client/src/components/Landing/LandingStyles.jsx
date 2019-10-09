import styled from "styled-components";

export const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100%;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Intro = styled.section`
  border-bottom: 1px solid ${props => props.theme.palette.border};
  background-color: #F8F8FC;
  width: 100%;
  height: 100vh;
  padding: 20px;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    /* border-right: 1px solid ${props => props.theme.palette.border}; */
    border-bottom: none;
  }
`;
