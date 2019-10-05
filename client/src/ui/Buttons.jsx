import { adjustHue, lighten } from "polished";
import styled, { css } from "styled-components";

import { AddToQueue } from "styled-icons/boxicons-regular/AddToQueue";
import { Bookmark } from "styled-icons/boxicons-regular/Bookmark";
import { Cancel } from "styled-icons/material/Cancel";
import { Check } from "styled-icons/material/Check";
import { Edit } from "styled-icons/material/Edit";
import { GroupAdd } from "styled-icons/material/GroupAdd";
import { PaperPlane } from "styled-icons/boxicons-regular/PaperPlane";
import { Settings } from "styled-icons/material/Settings";

// Primary Button Style
export const ButtonPrimary = styled.button.attrs(() => ({ type: "button" }))`
  display: inline-block;
  background: ${props => props.theme.palette.main};
  color: white;
  border: 1px solid ${props => props.theme.palette.main};
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 4px;
  ${props => props.theme.mixins.hoverFade};
  margin-right: ${props => (props.spacing ? "15px" : "0")};

  &:hover {
    border: 1px solid ${props => lighten(0.03, props.theme.palette.main)};
    background: ${props => lighten(0.03, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
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
  font-size: 15px;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    background: ${props => adjustHue(-10, lighten(0.301, props.theme.palette.main))};
    ${props => props.theme.mixins.hoverFade};
    border: 1px solid ${props => lighten(0.1, props.theme.palette.main)};
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
    background: ${props => lighten(0.2, props.theme.palette.main)};
    border: 1px solid ${props => lighten(0.2, props.theme.palette.main)};
  }
`;

// Styling for styled-icons in sidebar
export const IconStyle = css`
  color: ${props => lighten(0.35, props.theme.palette.text)};
  margin-right: 10px;
`;

export const NewArtefact = styled(AddToQueue)`
  ${IconStyle}
`;

export const EditProfile = styled(Edit)`
  ${IconStyle}
`;

export const Setting = styled(Settings)`
  ${IconStyle}
`;

export const Invite = styled(GroupAdd)`
  ${IconStyle}
`;

export const View = styled(PaperPlane)`
  ${IconStyle}
`;

export const Bookmarks = styled(Bookmark)`
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
