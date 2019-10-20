import styled from "styled-components";

export const DashboardContainer = styled.div`
  margin-top: 50px;
  padding: 10px 35px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin: 0;
  }
`;

export const MonthlyMementosWrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.size.gutterWidth};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    grid-template-columns: 1fr 1fr;
  }
`;