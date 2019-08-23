import styled from "styled-components";
import { lighten, darken } from 'polished';

export const FormInput = styled.input`
  /* width: ${props =>
    props.attributes === "lastName" || props.attributes === "firstName"
      ? "89%"
      : "100%"}; */
  padding: 10px;
  border: none;
  border-bottom: ${props =>
    props.valid ? "1px solid red" : "2px solid #E4DFDD"};
  display: block;
  margin-bottom: 0;
  margin-top: 50px;
  margin-left: ${props => (props.attributes === "lastName" ? "27px" : "0")};
  font-size: 14px;
  color: ${props => props.theme.palette.text};
`;

export const InputLabel = styled.label`
  font-size: 13px;
  color: ${props => lighten(0.3, props.theme.palette.text)};
  margin-top: 25px;
  display: block;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${props => props.theme.palette.border };
  width: 100%;
  font-size: 13px;
  padding: 5px 0;
  margin-bottom: 3px;

  &:focus {
    outline: none;
    border-color: ${props => darken(0.2, props.theme.palette.border)};
    transition: all ease 0.3s;
  }
`;

export const Error = styled.div`
  color: ${props => props.theme.palette.error};
  font-size: 10px;
  margin-bottom: 10px;
`;
