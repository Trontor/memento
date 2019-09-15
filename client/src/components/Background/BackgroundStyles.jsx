import styled from "styled-components";

export const SignupBackgroundWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 50%;
  z-index: 9;
  overflow-x: hidden;
`;

export const SignupOrganic = styled.div`
  position: absolute;
  display: block;
  opacity: 0.7;
  border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;
  /*animation-name: organic;
  animation-duration: 4s;
  animation-iteration-count: infinite;*/

  &:first-child {
    width: 120px;
    height: 125px;
    top: 15%;
    left: 65%;
    background: linear-gradient(225deg, #49e2e4, #d7d60b);

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
    background: linear-gradient(45deg, #49e2e4, #7befd3);

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
    background: linear-gradient(135deg, #ff512f, #dd0a97);

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
    background: linear-gradient(90deg, #4efbd2, #58f981);

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
    background: linear-gradient(135deg, #ff512f, #f4e209);
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
    background: linear-gradient(225deg, #8c09f4, #5890f9);

    @media screen and (max-width: ${props =>
        props.theme.breakpoints.tabletLandscape}) {
      display: none;
    }
  }

  /*@keyframes organic {
    0% {
      left: ;
    }
    33% {
      border-radius: 30% 70% 30% 70% / 32% 30% 70% 68%;
    }
    66% {
      border-radius: 70% 30% 70% 30% / 68% 70% 30% 32%;
    }
    100% {
      border-radius: 41% 59% 41% 59% / 43% 45% 55%;
    }
  }*/
`;
