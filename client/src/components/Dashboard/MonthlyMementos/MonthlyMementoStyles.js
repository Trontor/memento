import styled from "styled-components";
import {transparentize} from "polished";

export const DashboardContainer = styled.div`
  margin-top: 50px;
  padding: 10px 35px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin: 0 auto;
    max-width: 1200px;
  }
`;

export const MonthlyMementosWrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.size.gutterWidth};
  margin-bottom: 40px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const DashboardNotifier = styled.div`
  width: 100%;
  background-color: ${props => transparentize(0.8, props.theme.palette.foreground)};
  border: 1px solid ${props => transparentize(0.9, props.theme.palette.foreground)};
  padding: 20px;
  border-radius: 4px;
  font-family: "Livvic";
  font-weight: 700;
  box-shadow: 1px 1px 4px ${props => transparentize(0.9, props.theme.palette.text)};
  /* color: ${props => transparentize(0.3, props.theme.palette.text)}; */

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin-top: 20px;
  }

  p {
    font-family: "Rubik";
    /* color: ${props => transparentize(0, props.theme.palette.text)}; */
    font-weight: normal;
    margin-bottom: 0;
    line-height: 1.4em;

    span {
      font-family: "Livvic";
      font-weight: 700;
      color: ${props => props.theme.palette.main};
    }
  }
`;