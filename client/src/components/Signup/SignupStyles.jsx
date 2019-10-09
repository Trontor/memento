import styled from "styled-components";

export const SignupContainer = styled.form`
  padding: 50px;
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
