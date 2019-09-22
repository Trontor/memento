import { adjustHue, darken, lighten } from "polished";
import styled, { css } from "styled-components";

import { center } from "ui/Helpers";

export const TagsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
`;

export const Tag = styled.li`
  font-family: "Livvic", sans-serif;
  font-size: 14px;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  display: inline-block;
  padding: 7px 12px;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    border-color: ${props => lighten(0.15, props.theme.palette.main)};
    background-color: ${props => lighten(0.28, props.theme.palette.main)};
    color: ${props => lighten(0.03, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
  }

  &:active,
  &:focus {
    background-color: ${props =>
      adjustHue(5, lighten(0.23, props.theme.palette.main))};
    border-color: ${props => lighten(0.08, props.theme.palette.main)};
    color: ${props => props.theme.palette.main};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${props => lighten(0.05, props.theme.palette.main)};
      background-color: ${props =>
        adjustHue(5, lighten(0.25, props.theme.palette.main))};
      color: ${props => darken(0.08, props.theme.palette.main)};

      &:hover {
        border-color: ${props => lighten(0.05, props.theme.palette.main)};
        background-color: ${props =>
          adjustHue(5, lighten(0.25, props.theme.palette.main))};
        color: ${props => darken(0.08, props.theme.palette.main)};
      }
    `};
`;

export const NewTag = styled.button`
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme.palette.main};
  border: 1px solid ${props => lighten(0.05, props.theme.palette.main)};
  display: inline-block;
  padding: 7px 12px;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    border-color: ${props => props.theme.palette.main};
    background-color: ${props => props.theme.palette.main};
    color: white;

    i::after {
      border-color: white;
      ${props => props.theme.mixins.hoverFade};
    }
  }

  i {
    display: inline-block;
    margin-right: 5px;
    position: relative;
    font-size: 8px;
    transform: translateY(-1px);

    &:after {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: 16px;
      height: 16px;
      border: 1px solid ${props => props.theme.palette.main};
      border-radius: 50%;
      ${props => props.theme.mixins.hoverFade};
    }
  }
`;

export const UploadFileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const UploadFileButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  z-index: 100;
  cursor: pointer;
`;

export const UploadFileIcon = styled.span`
  display: block;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${props => lighten(0.25, props.theme.palette.main)};
  position: relative;

  i {
    font-size: 40px;
    color: ${props => props.theme.palette.main};
    ${center};
  }

  &:hover {
    background-color: ${props => props.theme.palette.main};

    i {
      color: white;
    }
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    width: 120px;
    height: 120px;
  }
`;

export const UploadFileLabel = styled.label`
  display: inline-block;
  padding-top: 10px;
`;
