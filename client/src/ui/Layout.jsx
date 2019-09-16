import styled from "styled-components";

export const SiteGrid = styled.div`
  width: 100%;
  display: flex;
`;

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

export const Main = styled.div`
  order: 1;
  width: 100%;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    flex-grow: 2;
    display: inline-block;
  }
`;