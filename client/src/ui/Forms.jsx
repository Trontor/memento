import styled from "styled-components";
import { lighten,darken } from 'polished';

export const InputContainer = styled.div`
  margin-bottom: 25px;
`;

export const InputLabel = styled.label`
  font-size: 13px;
  color: ${props => lighten(0.3, props.theme.palette.text)};
  display: block;
`;

export const InputField = styled.input`
  color: ${props => props.theme.palette.text};
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  font-size: 19px;
  padding: 8px 0;
  margin-bottom: 3px;
  ${props => props.theme.mixins.hoverFade};

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