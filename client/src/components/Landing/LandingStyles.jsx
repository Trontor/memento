import styled from "styled-components";

export const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Intro = styled.section`
  width: 100%;
  height: 100%;
  border-right: 1px solid grey;
  padding: 20px;
`;
