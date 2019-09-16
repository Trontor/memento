import styled, { css } from "styled-components";
import { center } from "./Helpers";

export const Spinner = styled.span`
  ${center};
  border-radius: 50%;
  border-style: solid;
  display: inline-block;
  width: 1em;
  height: 1em;
  animation: spinner 1.2s cubic-bezier(0.5, 0.7, 0.8, 0.5) infinite;
  border-right-color: ${props => props.theme.palette.main};
  border-left-color: rgba(0, 0, 0, 0.05);
  border-top-color: rgba(0, 0, 0, 0.05);
  border-bottom-color: rgba(0, 0, 0, 0.05);
  ${({ size }) => handleSpinnerSize(size)};
  ${({ light }) =>
    light &&
    css`
      border-right-color: white;
      border-left-color: rgba(255, 255, 255, 0.3);
      border-top-color: rgba(255, 255, 255, 0.3);
      border-bottom-color: rgba(255, 255, 255, 0.3);
      border-width: 3px;
    `};

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const small = css`
  width: 1.5em;
  height: 1.5em;
  border-width: 3px;
`;

const large = css`
  width: 3em;
  height: 3em;
  border-width: 6px;
`;

const handleSpinnerSize = size => {
  switch (size) {
    case "small":
      return small;
    case "large":
      return large;
    default:
  }
};
