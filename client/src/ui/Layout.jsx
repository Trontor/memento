import styled from "styled-components";

export const SiteGrid = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-areas: "sidebar content"; */
  display: flex;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {

  }
`;