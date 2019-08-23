import styled from "styled-components";
import { lighten } from 'polished';

export const InputContainer = styled.div`
  margin-bottom: 25px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${props => lighten(0.3, props.theme.palette.text)};
  display: block;
`;

export const Input = styled.input`
  color: ${props => props.theme.palette.text};
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border};
  width: 100%;
  font-size: 19px;
  padding: 7px 0;
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
