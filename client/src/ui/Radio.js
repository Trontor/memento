import { lighten } from "polished";
import styled from "styled-components";

export const RadioOption = styled.div`
  position: relative;
  margin: 12px 0;
  display: flex;
  align-items: center;
`;

export const RadioButtonStyle = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 2px solid ${props => lighten(0.6, props.theme.palette.text)};
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:after {
    display: none;
    content: "";
    width: 170%;
    height: 170%;
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
  margin-left: 10px;
  font-size: 13px;
`;