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
  padding: 0 8vw;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
`

export const FeatureWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const FeatureImg = styled.div`
  flex: 0 0 100px;

  img {

  }
`;

