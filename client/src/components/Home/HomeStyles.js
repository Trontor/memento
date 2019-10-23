import styled, { keyframes } from "styled-components";

import { transparentize } from "polished";

export const PageHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 8vw;
  align-items: center;
  width: 100%;
`;

export const Intro = styled.section`
  padding: 0 8vw;
  border-bottom: 1px solid ${props => transparentize(0.95, props.theme.palette.text)};
  position: relative;
  overflow: hidden;
`;

export const IntroContent = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 100px 0 140px 0;
  max-width: 480px;

  h1 {
    font-size: 24px;
    margin-left: auto;
    margin-right: auto;
    max-width: 460px;
  }

  p {
    opacity: 0.7;
    line-height: 1.6em;
    font-size: 15px;
    margin-bottom: 50px;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    max-width: 600px;

    h1 {
      max-width: 600px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const PitchActions = styled.div`
  text-align: center;

  button {
    margin: 0 10px;
  }
`;
const floating = keyframes`
    from { transform: translate(0,  -5px); }
    65%  { transform: translate(-2px, 5px); }
    to   { transform: translate(0, -5px); }
`;

export const FeaturesOverview = styled.section`
  margin: 0 auto;
  padding: 80px 8vw;
  background-color: #F5F9FC;
`
export const FeaturesContentWrapper = styled.div`
  max-width: 768px;
  margin-bottom: 80px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 100px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  align-items: center;
  margin-bottom: 60px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

export const FeatureImg = styled.div`
  flex: 0 0 108px;
  margin-right: 32px;

  img {
    width: 100%;

    @media screen and (min-width: ${props =>
    props.theme.breakpoints.tabletPortrait}) {
      width: auto;
      height: 80px;
      margin-bottom: 24px;
      animation: ${floating} 4.5s linear infinite;
    }
  }
`;

export const FeatureTitle = styled.div`
  font-family: "Livvic", sans-serif;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: bold;
`;

export const FeatureDescription = styled.div`
  opacity: 0.7;
  line-height: 1.5em;
  font-size: 15px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    font-size: 16px;
  }
`;