import styled from "styled-components";

export const SiteGrid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftColumn = styled.div`
  display: none;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    display: block;
    flex-grow: 0;
    flex-shrink: 1;
    min-width: ${props => props.theme.size.sidebar};
    flex-basis: ${props => props.theme.size.sidebar};
    overflow-y: auto;
  }
`;

export const Main = styled.div`
  order: 1;
  width: 100%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    flex-grow: 2;
    display: inline-block;
  }
`;