import styled, {css} from "styled-components";
import { lighten } from "polished";

export const RadioOption = styled.div`
  position: relative;
  margin-bottom: 10px;
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
    content: '';
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
`

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
    border-color: ${props => lighten(0.2, props.theme.palette.main)};
    background-color: ${props => lighten(0.3, props.theme.palette.main)};
    color: ${props => lighten(0.02, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
  }

  ${({selected}) => selected && css`
    background-color: ${props => lighten(0.3, props.theme.palette.main)};
    border-color: ${props => lighten(0.05, props.theme.palette.main)};
    color: ${props => props.theme.palette.main};

    &:hover {
      background-color: ${props => lighten(0.3, props.theme.palette.main)};
      border-color: ${props => lighten(0.05, props.theme.palette.main)};
      color: ${props => props.theme.palette.main};
    }
  `};
`;

export const NewTag = styled.button`
  font-family: "Livvic", sans-serif;
  font-size: 14px;
  color: ${props => props.theme.palette.main};
  border: 1px solid ${props => lighten(0.15, props.theme.palette.main)};
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
      content: '';
      width: 16px;
      height: 16px;
      border: 1px solid ${props => props.theme.palette.main};
      border-radius: 50%;
      ${props => props.theme.mixins.hoverFade};
    }
  }
`;