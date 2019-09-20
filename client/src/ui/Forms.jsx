import { darken, lighten } from "polished";
import styled, { css } from "styled-components";
import { User } from "styled-icons/fa-regular/User";

// Single-line text input field
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
  background-color: inherit;

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

//Used to wrap around each input
export const InputSection = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

// Used to wrap around each section in a form
export const FormSection = styled.div`
  margin-bottom: 50px;
  position: relative;

  &:last-child {
    margin-bottom: 25px;
  }
`;

// Labels for each input field
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

// Longer instructions for each input to instruct users
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

// Error cases
export const Error = styled.div`
  color: ${props => props.theme.palette.error};
  font-size: 10px;
  margin-bottom: 10px;
`;

// Text beneath input to provide guidance for users
export const FormHelpText = styled.span`
  font-size: 11px;
  font-weight: 300;
  opacity: 0.6;
`;

// Text to guide users on login and signup pages
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

// Container used to hold form navigation buttons
export const FormNav = styled.div`
  width: 100%;
`;

// Array of form input fields
export const FormInputList = styled.div`
  width: 100%;
  padding: 6px 0;
  margin-bottom: 3px;

  &:first-child {
    margin-top: 3px;
  }
`;

// Multi-line text input fields
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
    background-color: transparent;

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

export const DefaultInput = styled.div`
  font-family: "Rubik", sans-serif;
  font-weight: normal;
  color: ${props => props.theme.palette.text};
  border: none;
  width: 100%;
  font-size: 19px;
  padding: 6px 0;
  margin-top: 10px;
`;

export const ImgPreview = styled.div`
  display: block;
  margin: 0 auto;
  background: #f8f8f8;
  height: 200px;
  width: 200px;
  border: 2px solid gray;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserAvatar = styled(User)`
  color: gray;
  margin: 35px 0 0 35px;
`;
