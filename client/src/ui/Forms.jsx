import styled, { css } from "styled-components";

import { User } from "styled-icons/fa-regular/User";
import { lighten } from "polished";

// Single-line text input field
export const InputField = styled.input`
  font-family: "Rubik", sans-serif;
  font-weight: normal;
  color: ${props => props.theme.palette.text};
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  font-size: 19px;
  padding: 8px 0;
  margin-bottom: 3px;
  ${props => props.theme.mixins.hoverFade};
  background-color: inherit;

  :-webkit-autofill {
    box-shadow: 0 0 0 30px ${props => props.theme.palette.background} inset;
    font-size: 19px;
    color: ${props => props.theme.palette.text};
  }

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
  margin-bottom: 20px;
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

// Error Message
export const Error = styled.div`
  font-family: "Livvic", sans-serif;
  letter-spacing: 0.01em;
  color: ${props => props.theme.palette.error};
  font-size: 13px;
  padding-top: 1px;
`;

// Text beneath input to provide guidance for users
export const FormHelpText = styled.span`
  font-size: 11px;
  font-weight: 300;
  opacity: 0.6;
`;

// Text to guide users on login and signup pages
export const HelpText = styled.span`
  font-size: 13px;
  letter-spacing: 0.01em;
  font-family: "Livvic", sans-serif;
  color: ${props => lighten(0.1, props.theme.palette.text)};

  a {
    text-decoration: none;
    color: ${props => props.theme.palette.main};
    font-weight: bold;

    &:hover {
      color: ${props => lighten(0.05, props.theme.palette.main)};
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

export const DefaultInput = styled.div`
  font-family: "Rubik", sans-serif;
  color: ${props => props.theme.palette.text};
  border: none;
  width: 100%;
  font-size: 19px;
  padding-top: 8px;
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

export const InputEdit = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-column-gap: 10px;
`;

export const ErrorBanner = styled.div`
  font-family: "Livvic", sans-serif;
  width: 100%;
  font-size: 16px;
  border: 1px solid ${props => lighten(0.1, props.theme.palette.error)};
  background-color: ${props => lighten(0.35, props.theme.palette.error)};
  color: ${props => props.theme.palette.error};
  padding: 14px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
`