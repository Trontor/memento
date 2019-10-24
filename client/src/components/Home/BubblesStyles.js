import styled, {keyframes} from "styled-components";

import { transparentize } from "polished";

export const Background = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
`;

const floating = keyframes`
  from { transform: translate(0, -10px); }
  20%  { transform: translate(0, -15px); }
  35%  { transform: translate(0, -20px); }
  75%  { transform: translate(0, 10px); }
  to   { transform: translate(0, -10px); }
`;

const shapeshift = keyframes`
  from {
    border-radius: 81% 59% 41% 59% / 82% 65% 80% 57%;
  }
  25% {
    border-radius: 61% 69% 51% 49% / 76% 75% 65% 47%;
  }
  40% {
    border-radius: 47% 79% 91% 39% / 63% 85% 85% 77%;
    rotate: 180deg;
  }
  65% {
    border-radius: 61% 69% 51% 49% / 71% 75% 65% 47%;
  }
  to  {
    border-radius: 81% 59% 41% 59% / 82% 65% 80% 57%;
    rotate: 360deg;
  }
`;

export const Bubbles = styled.div`
  left: 50%;
  position: absolute;
  z-index: -1;

  &:before, &:after {
    display: block;
    content: '';
  }

  &:before {
    width: 10px;
    height: 10px;
    margin-left: 500px;
    top: 100px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.45, "#DCE5FD")},
        ${transparentize(0.3, "#CEE8F9")}
      );
    animation: ${floating} 7s linear infinite, ${shapeshift} 3s linear infinite;
  }

  &:first-child {
    width: 155px;
    height: 135px;
    margin-left: -500px;
    top: 90px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.8, "paleturquoise")},
        ${transparentize(0.65, "paleturquoise")}
      );
    animation: ${floating} 7.5s linear infinite, ${shapeshift} 3s linear infinite;

    &:after {
      content: '';
      display: block;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      margin-left: 200px;
      margin-top: -100px;
      background:
        linear-gradient(90deg,
          ${transparentize(0.45, "#DCE5FD")},
          ${transparentize(0.6, "#CEE8F9")}
        );
      animation: ${floating} 30s linear infinite;
    }
  }

  &:nth-child(2) {
    width: 32px;
    height: 30px;
    margin-left: -400px;
    top: 30px;
    background:
      linear-gradient(-30deg,
        ${transparentize(0.65, "#90B6E8")},
        ${transparentize(0.7, "#A4CBF0")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 4s linear infinite;
  }

  &:nth-child(3) {
    width: 70px;
    height: 70px;
    margin-left: -360px;
    top: 65px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.65, "lightsalmon")},
        ${transparentize(0.8, "pink")}
      );
    rotate: 45deg;
    animation-delay: 0.5s;
    animation: ${floating} 7s linear infinite, ${shapeshift} 3s linear infinite;
  }

  &:nth-child(4) {
    width: 165px;
    height: 140px;
    margin-left: 280px;
    top: 270px;
    background:
      linear-gradient(100deg,
        ${transparentize(0.8, "salmon")},
        ${transparentize(0.75, "lightsalmon")}
      );
    animation: ${floating} 7.5s linear infinite, ${shapeshift} 3s linear infinite;
  }

  &:nth-child(5) {
    width: 45px;
    height: 45px;
    margin-left: -370px;
    top: 360px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.65, "#A4CBF0")},
        ${transparentize(0.6, "#A4CBF0")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 2s linear infinite;

    &:after {
      display: block;
      content: "";
      width: 500px;
      height: 300px;
      margin-left: -220px;
      margin-top: 25px;
      background:
        linear-gradient(-90deg,
          ${transparentize(0.75, "#A4C8F0")},
          ${transparentize(0.65, "#CCD3FF")}
        );
      animation: ${floating} 15s linear infinite, ${shapeshift} 2s linear infinite;
      rotate: 50deg;
    }
  }

  &:nth-child(6) {
    width: 80px;
    height: 75px;
    margin-left: 260px;
    top: 250px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.75, "#A4CBF0")},
        ${transparentize(0.6, "#DCE5FD")}
      );
    animation: ${floating} 7s linear infinite, ${shapeshift} 3s linear infinite;
  }

  &:nth-child(7) {
    width: 18px;
    height: 18px;
    margin-left: 290px;
    top: 80px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.65, "#A4CBF0")},
        ${transparentize(0.6, "#A4CBF0")}
      );
    animation: ${floating} 6.8s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(8) {
    width: 220px;
    height: 190px;
    margin-left: 330px;
    top: 200px;
    background:
      linear-gradient(90deg,
        ${transparentize(0.85, "lightskyblue")},
        ${transparentize(0.7, "lightskyblue")}
      );
    animation: ${floating} 8s linear infinite, ${shapeshift} 3s linear infinite;
    rotate: 90deg;
  }

  &:nth-child(9) {
    width: 20px;
    height: 18px;
    margin-left: -305px;
    top: 105px;
    background:
      linear-gradient(180deg,
        ${transparentize(0.65, "#A4CBF0")},
        ${transparentize(0.65, "#A4CBF0")}
      );
    animation: ${floating} 8s linear infinite, ${shapeshift} 3s linear infinite;;
    rotate: 90deg;
  }

  &:nth-child(10) {
    width: 16px;
    height: 15px;
    margin-left: 360px;
    top: 250px;
    background:
      linear-gradient(90deg,
        ${transparentize(0.5, "#A4CBF0")},390p
        ${transparentize(0.65, "#A4CBF0")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 4s linear infinite;;
    rotate: 90deg;
  }

  &:nth-child(11) {
    border-radius: 50%;
    width: 280px;
    height: 280px;
    margin-left: 30px;
    top: 40px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.6, "lavender")},
        ${transparentize(0.65, "lavender")}
      );
    animation: ${floating} 9s linear infinite, ${shapeshift} 5s linear infinite;
    animation-delay: 0.5s;
  }
`;