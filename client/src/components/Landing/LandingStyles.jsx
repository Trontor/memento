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
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  height: 100%;
  padding: 20px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLanscape}) {
    border-right: 1px solid ${props => props.theme.palette.border};
    border-bottom: none;
  }
`;
