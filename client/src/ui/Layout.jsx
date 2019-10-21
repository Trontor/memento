import styled from "styled-components";

// Overall site layout
export const SiteGrid = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* You could use :after - it doesn't really matter */
  ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    background: url("https://www.toptal.com/designers/subtlepatterns/patterns/leaves-pattern.png");
  }
`;

// Left column of site grid
export const LeftColumn = styled.div`
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    min-width: ${props => props.theme.size.sidebar}px;
    flex-basis: ${props => props.theme.size.sidebar}px;
    overflow-y: auto;
  }
`;

// Main view of site grid
export const Main = styled.div`
  order: 1;
  width: 100%;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    flex-grow: 2;
    display: inline-block;
  }
`;
