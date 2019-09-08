import styled from "styled-components";
import { lighten } from "polished";
import { center } from "ui/Helpers"

export const RadioOption = styled.div`
  position: relative;
  margin-bottom: 12px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
`;

export const RadioButtonStyle = styled.span`
  display: inline-block;
  /* top: 50%;
  left: 50%; */
  height: 20px;
  width: 20px;
  border: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  border-radius: 50%;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:after {
    display: none;
    content: '';
    width: 150%;
    height: 150%;
    background-color: ${props => props.theme.palette.main};
    border-radius: 50%;
    opacity: 0.15;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${props => props.theme.mixins.hoverFade};

  }
`;

export const RadioButton = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  width: 100%;
  height: 100%;

  &:checked + ${RadioButtonStyle} {
    border-color: ${props => lighten(0.15, props.theme.palette.main)};

    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      background-color: ${props => props.theme.palette.main};
      width: 50%;
      height: 50%;
      opacity: 1;
    }
  }

  &:hover + ${RadioButtonStyle} {
    border-color: ${props => lighten(0.15, props.theme.palette.main)};

    &:after {
      display: block;
    }
  }

  &:active + ${RadioButtonStyle} {
    &::after {
      display: block;
      background-color: ${props => props.theme.palette.main};
      opacity: 0.35;
    }
  }
`;

export const RadioLabel = styled.label`
  display: inline-block;
  /* position: absolute; */
  /* transform: translateY(25%); */
  margin-left: 10px;
`