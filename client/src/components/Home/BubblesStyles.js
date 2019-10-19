import { lighten, transparentize } from "polished";
import styled, {keyframes} from "styled-components";

export const Background = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
`;

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
  border-radius: 41% 59% 41% 59% / 43% 45% 55% 57%;
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
        ${transparentize(0.7, "#DCE5FD")},
        ${transparentize(0.9, "#CEE8F9")}
      );
    animation: ${floating} 5s linear infinite, ${shapeshift} 1.5s linear infinite;
  }

  &:first-child {
    width: 115px;
    height: 105px;
    margin-left: -500px;
    top: 90px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.85, "#DCE5FD")},
        ${transparentize(0.8, "#D3E1F7")}
      );
    animation: ${floating} 5s linear infinite, ${shapeshift} 1.5s linear infinite;

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
          ${transparentize(0.7, "#DCE5FD")},
          ${transparentize(0.9, "#CEE8F9")}
        );
      animation: ${floating} 20s linear infinite;
    }
  }

  &:nth-child(2) {
    width: 32px;
    height: 30px;
    margin-left: -400px;
    top: 30px;
    background:
      linear-gradient(-30deg,
        ${transparentize(0.9, "#90B6E8")},
        ${transparentize(0.9, "#A4CBF0")}
      );
    animation: ${floating} 4s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(3) {
    width: 70px;
    height: 70px;
    margin-left: -360px;
    top: 65px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.8, "#DCEDFD")},
        ${transparentize(0.75, "#DCE5FD")}
      );
    rotate: 45deg;
    animation-delay: 0.5s;
    animation: ${floating} 5s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(4) {
    width: 165px;
    height: 140px;
    margin-left: 280px;
    top: 270px;
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
    top: 360px;
    background:
      linear-gradient(135deg,
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.85, "#A4CBF0")}
      );
    animation: ${floating} 4s linear infinite, ${shapeshift} 1s linear infinite;

    &:after {
      display: block;
      content: "";
      width: 500px;
      height: 300px;
      margin-left: -220px;
      margin-top: 25px;
      background:
        linear-gradient(-90deg,
          ${transparentize(0.92, "#A4C8F0")},
          ${transparentize(0.9, "#CCD3FF")}
        );
      animation: ${floating} 12s linear infinite, ${shapeshift} 2s linear infinite;
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
        ${transparentize(0.9, "#A4CBF0")},
        ${transparentize(0.85, "#DCE5FD")}
      );
    animation: ${floating} 5s linear infinite, ${shapeshift} 2s linear infinite;
  }

  &:nth-child(7) {
    width: 18px;
    height: 18px;
    margin-left: 290px;
    top: 80px;
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
    top: 200px;
    background:
      linear-gradient(90deg,
        ${transparentize(0.9, "#DCE5FD")},
        ${transparentize(0.95, "#A4CBF0")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 2s linear infinite;
    rotate: 90deg;
  }

  &:nth-child(9) {
    width: 20px;
    height: 18px;
    margin-left: -305px;
    top: 105px;
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
    width: 280px;
    height: 280px;
    margin-left: 30px;
    top: 40px;
    background:
      linear-gradient(225deg,
        ${transparentize(0.85, "#D6E0FF")},
        ${transparentize(0.85, "#DCEDFD")}
      );
    animation: ${floating} 6s linear infinite, ${shapeshift} 3s linear infinite;
    animation-delay: 0.5s;
  }
`;