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
  display: flex;
  flex-wrap: wrap;

  > div {
    flex-grow: 1;
    width: 33%;
  }
`;
