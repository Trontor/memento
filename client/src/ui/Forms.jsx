import styled, { css } from "styled-components";
import { lighten, darken } from "polished";

export const InputSection = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

export const FormSection = styled.div`
  margin-bottom: 50px;
  position: relative;

  &:last-child {
    margin-bottom: 25px;
  }
`;

export const AnimateLabel = css`
  transform: translateY(-150%);
  font-size: 11px;
  color: ${props => lighten(0.1, props.theme.palette.text)};
  transition: 0.3s ease-in-out;
`;

export const InputLabel = styled.label`
  font-size: 13px;
  color: ${props => lighten(0.35, props.theme.palette.text)};
  display: block;
  transition: 0.5s ease-in-out;

  ${({ filled }) =>
    filled &&
    css`
      transform: translateY(-150%);
      font-size: 11px;
      color: ${props => lighten(0.1, props.theme.palette.text)};
      transition: 0.3s ease-in-out;
    `}
`;

export const InstructionLabel = styled.label`
  font-size: 14px;
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  display: block;
  margin-bottom: 1em;
  opacity: 0.75;
  line-height: 1.5em;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    font-size: 15px;
  }
`;

export const InputField = styled.input`
  font-family: "Rubik", sans-serif;
  font-weight: normal;
  color: ${props => props.theme.palette.text};
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  font-size: 19px;
  padding: 6px 0;
  margin-bottom: 3px;
  ${props => props.theme.mixins.hoverFade};

  ::placeholder {
    opacity: 0.4;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: ${props => lighten(0.1, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
  }
`;

export const Error = styled.div`
  color: ${props => props.theme.palette.error};
  font-size: 10px;
  margin-bottom: 10px;
`;

export const HelpText = styled.span`
  font-size: 11px;

  a {
    text-decoration: none;
    color: ${props => props.theme.palette.main};
    font-weight: bold;

    &:hover {
      color: ${props => darken(0.1, props.theme.palette.main)};
    }
  }
`;

export const FormHelpText = styled.span`
  font-size: 11px;
  font-weight: 300;
  opacity: 0.6;
`;

export const FormNav = styled.div`
  width: 100%;
`;

export const FormInputList = styled.div`
  width: 100%;
  padding: 6px 0;
  margin-bottom: 3px;

  &:first-child {
    margin-top: 3px;
  }
`;

export const TextArea = styled.div`
  > textarea {
    width: 100%;
    max-width: 100%;
    border: none;
    border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
    font-size: 15px;
    color: ${props => props.theme.palette.text};
    resize: none;
    line-height: 1.5em;

    ::placeholder {
      opacity: 0.4;
      font-weight: 300;
  }

    &:focus {
      outline: none;
      border-color: ${props => lighten(0.1, props.theme.palette.main)};
    }
  }
`;
