import { adjustHue, lighten, transparentize } from "polished";
import styled, { css } from "styled-components";

import { Cancel } from "styled-icons/material/Cancel";
import { Check } from "styled-icons/material/Check";
import { Edit } from "styled-icons/material/Edit";

// Primary Button Style
export const ButtonPrimary = styled.button.attrs(() => ({ type: "button" }))`
  display: inline-block;
  background: ${props => props.theme.palette.main};
  color: white;
  border: 1px solid ${props => props.theme.palette.main};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  ${props => props.theme.mixins.hoverFade};
  margin-right: ${props => (props.spacing ? "15px" : "0")};

  &:hover {
    border: 1px solid ${props => lighten(0.03, props.theme.palette.main)};
    background: ${props => lighten(0.03, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
    transform: translateY(-2px);
    box-shadow: 0px 1px 3px ${props => transparentize(0.7, props.theme.palette.main)};
  }

  &:disabled,
  &[disabled] {
    background-color: ${props => props.theme.palette.disabled};
    border-color: ${props => props.theme.palette.disabled};
    cursor: default;
  }
`;

// Secondary Button Style
export const ButtonSecondary = styled.button.attrs(() => ({ type: "button" }))`
  border: 1px solid ${props => lighten(0.15, props.theme.palette.main)};
  color: ${props => props.theme.palette.main};
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
  height: 42px;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    background: ${props => adjustHue(-20, transparentize(0.97, props.theme.palette.main))};
    ${props => props.theme.mixins.hoverFade};
    border: 1px solid ${props => lighten(0.1, props.theme.palette.main)};
    box-shadow: 0px 1px 3px ${props => transparentize(0.8, props.theme.palette.main)};
  }

  &:disabled,
  &[disabled] {
    background-color: ${props => props.theme.palette.disabled};
    border-color: ${props => props.theme.palette.disabled};
    cursor: default;
  }
`;

// Light Primary Button Style
export const ButtonPrimaryLight = styled(ButtonPrimary)`
  color: ${props => props.theme.palette.main};
  background: ${props => lighten(0.25, props.theme.palette.main)};
  border: 1px solid ${props => lighten(0.25, props.theme.palette.main)};

  &:hover {
    background: ${props => lighten(0.27, props.theme.palette.main)};
    border: 1px solid ${props => lighten(0.27, props.theme.palette.main)};
    transform: translateY(-2px);
    box-shadow: 0px 1px 3px ${props => transparentize(0.92, props.theme.palette.text)};
  }
`;

// Styling for styled-icons in sidebar
export const IconStyle = css`
  color: ${props => lighten(0.35, props.theme.palette.text)};
  margin-right: 10px;
`;

export const EditProfile = styled(Edit)`
  ${IconStyle}
`;

// Add input field button
export const AddButton = styled.button.attrs(() => ({ type: "button" }))`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${props => lighten(0.03, props.theme.palette.main)};
  color: ${props => props.theme.palette.main};
  margin: 10px 0;
  position: relative;
  display: block;
  background: transparent;

  i {
    display: block;
  }

  &:after {
    display: block;
    content: '${props => props.text}';
    position: absolute;
    top: 50%;
    transform: translate(25px, -50%);
    width: 115px;
    text-align: left;
  }
`;

const ButtonIconStyle = css`
  color: ${props => lighten(0.35, props.theme.palette.text)};
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    color: ${props => props.theme.palette.text};
    ${props => props.theme.mixins.hoverFade};
  }
`;

export const EditButton = styled(Edit)`
  ${ButtonIconStyle}
`;

export const CancelButton = styled(Cancel)`
  ${ButtonIconStyle}
`;

export const TickButton = styled(Check)`
  ${ButtonIconStyle}
`;
