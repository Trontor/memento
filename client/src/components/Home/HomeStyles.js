import styled from "styled-components";

export const PageHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 0 8vw;
  align-items: center;
`;

export const Intro = styled.section`
  padding: 0 8vw;
`;

export const IntroContent = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 70px 0 100px 0;
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

export const FeaturesOverview = styled.section`
  margin: 0 auto;
  padding: 20px 8vw;
  background-color: #F5F8FC;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    display: flex;
    flex-wrap: wrap;
    padding: 40px 15vw;
  }
`

export const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  align-items: center;
  margin-bottom: 50px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    flex: 0 1 50%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FeatureImg = styled.div`
  flex: 0 0 120px;
  margin-right: 24px;

  img {
    width: 100%;

    @media screen and (min-width: ${props =>
    props.theme.breakpoints.tabletPortrait}) {
      height: 128px;
    }
  }
`;

export const FeatureTitle = styled.div`
  font-family: "Livvic", sans-serif;
  margin-bottom: 8px;
`;

export const FeatureDescription = styled.div`
  opacity: 0.7;
  line-height: 1.5em;
`;