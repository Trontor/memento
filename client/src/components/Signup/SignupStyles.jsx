import { lighten } from "polished";
import styled from "styled-components";

export const SignupContainer = styled.form`
  margin: 50px;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
`;

export const SignupHeader = styled.h2`
  letter-spacing: 0.01em;
  border-bottom: 4px solid ${props => props.theme.palette.main};
  display: inline-block;
  padding-bottom: 4px;
  margin-bottom: 1.5em;
`;

export const NameInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
`;


export const ErrorBanner = styled.div`
  font-family: "Livvic", sans-serif;
  width: 100%;
  font-size: 18px;
  border: 1px solid ${props => lighten(0.1, props.theme.palette.error)};
  background-color: ${props => lighten(0.35, props.theme.palette.error)};
  color: ${props => props.theme.palette.error};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
`