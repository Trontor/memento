import styled from "styled-components";

export const SignupBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* display: flex;
  justify-content: flex-start; */
  min-height: 100vh;
  width: 50%;
  z-index: 9;
  overflow: hidden;
`;

export const SignupOrganic = styled.div`
  position: absolute;
  display: block;
  opacity: 0.7;
  border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;

  &:first-child {
    width: 120px;
    height: 125px;
    top: 15%;
    left: 65%;
    background: linear-gradient(225deg, rgba(255, 187, 176, 0.1), rgba(255, 187, 176, 0.5));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  &:nth-child(2) {
    width: 30px;
    height: 35px;
    top: 10%;
    left: 80%;
    background: linear-gradient(45deg, rgba(255, 187, 176, 0.2), rgba(255, 187, 176, 0.5));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  &:nth-child(3) {
    width: 130px;
    height: 105px;
    top: 58%;
    left: 10%;
    background: linear-gradient(135deg, rgba(255, 187, 176, 0.5), rgba(255, 187, 176, 0.2));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  &:nth-child(4) {
    width: 175px;
    height: 150px;
    top: 85%;
    left: 60%;
    background: linear-gradient(90deg, rgba(255, 187, 176, 0.5), rgba(255, 187, 176, 0.3));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  &:nth-child(5) {
    width: 25px;
    height: 25px;
    top: 70%;
    left: 80%;
    background: linear-gradient(135deg, rgba(255, 187, 176, 0.1), rgba(255, 187, 176, 0.3));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  &:nth-child(6) {
    width: 85px;
    height: 85px;
    top: 78%;
    left: 55%;
    background: linear-gradient(225deg, rgba(255, 187, 176, 0.1), rgba(255, 187, 176, 0.3));

    @media screen and (max-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }
`;
