import { lighten, transparentize } from "polished";
import styled, {keyframes} from "styled-components";

export const Background = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0;
`;

// const floating = keyframes`
//   from { transform: translate(0, 0px); }
//   25%  { transform: translate(-2px, 10px); }
//   40%  { transform: translate(-5px, 20px); }
//   65%  { transform: translate(0px, 7px); }
//   to   { transform: translate(0, 0px); }
// `;

const floating = keyframes`
  from { transform: translate(0, 0px); }
  20%  { transform: translate(0, -12px); }
  35%  { transform: translate(0, -20px); }
  75%  { transform: translate(0, 10px); }
  to   { transform: translate(0, 0px); }
`;

const shapeshift = keyframes`
  from {
    border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;
  }
  25% {
    border-radius: 31% 69% 51% 49% / 53% 55% 65% 47%;
  }
  40% {
    border-radius: 51% 79% 61% 39% / 63% 75% 85% 77%;
  }
  65% {
    border-radius: 31% 69% 51% 49% / 63% 55% 65% 47%;
  }
  to  {
    border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;
  }
`;

export const Bubbles = styled.div`
  position: absolute;
  overflow: hidden;
  border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;
  left: 50%;

  &:first-child {
    width: 115px;
    height: 105px;
    margin-left: -440px;
    top: 130px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.85, "#A4CBF0")},
        ${transparentize(0.95, "#90B6E8")}
      );
    animation: ${floating} 5s linear infinite, ${shapeshift} 1.5s linear infinite;
  }

  &:nth-child(2) {
    width: 32px;
    height: 30px;
    margin-left: -400px;
    top: 70px;
    background:
      linear-gradient(-30deg,
        ${transparentize(0.97, "#90B6E8")},
        ${transparentize(0.9, "#A4CBF0")}
      );
    animation: ${floating} 4s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(3) {
    width: 70px;
    height: 70px;
    margin-left: -360px;
    top: 85px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.95, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    rotate: 45deg;
    animation-delay: 0.5s;
    animation: ${floating} 5s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(4) {
    width: 165px;
    height: 140px;
    margin-left: 280px;
    top: 290px;
    background:
      linear-gradient(100deg,
        ${transparentize(0.97, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    animation: ${floating} 5.5s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(5) {
    width: 45px;
    height: 45px;
    margin-left: -370px;
    top: 380px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    animation: ${floating} 4s linear infinite, ${shapeshift} 1s linear infinite;
  }

  &:nth-child(6) {
    width: 80px;
    height: 75px;
    margin-left: 260px;
    top: 270px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    animation: ${floating} 5s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(7) {
    width: 18px;
    height: 18px;
    margin-left: 290px;
    top: 100px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    animation: ${floating} 4.8s linear infinite, ${shapeshift} 1s linear infinite;
  }

  &:nth-child(8) {
    width: 220px;
    height: 190px;
    margin-left: 330px;
    top: 220px;
    background:
      linear-gradient(90deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.95, "#A4CBF0")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 2s linear infinite;
    rotate: 90deg;
  }

  &:nth-child(9) {
    width: 20px;
    height: 18px;
    margin-left: -305px;
    top: 130px;
    background:
      linear-gradient(180deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.9, "#A4CBF0")}
      );
    animation: ${floating} 7s linear infinite, ${shapeshift} 2s linear infinite;;
    rotate: 90deg;
  }

  &:nth-child(10) {
    width: 16px;
    height: 15px;
    margin-left: 360px;
    top: 250px;
    background:
      linear-gradient(90deg,
        ${transparentize(0.8, "#A4CBF0")},390p
        ${transparentize(0.9, "#A4CBF0")}
      );
    animation: ${floating} 4s linear infinite, ${shapeshift} 2s linear infinite;;
    rotate: 90deg;
  }

  &:nth-child(11) {
      width: 300px;
      height: 300px;
      top: 100px;
      background:
        linear-gradient(225deg,
          ${transparentize(0.9, "#A4CBF0")},
          ${transparentize(0.85, "#A4CBF0")}
        );
      animation: ${floating} 4.2s linear infinite, ${shapeshift} 2s linear infinite;
    }
`;