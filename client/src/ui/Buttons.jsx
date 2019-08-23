import styled from "styled-components";
import { darken } from 'polished';

export const SubmitButton = styled.button`
  background: ${props => props.theme.palette.main};
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 14px;
  display: block;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    background: ${props => darken(0.1, props.theme.palette.main)};
    ${props => props.theme.mixins.hoverFade};
  }
`;