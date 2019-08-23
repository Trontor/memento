import styled from "styled-components";

export const SignupContainer = styled.form`
  margin: 50px;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    /* margin: 80px; */
  }
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
  grid-gap: 30px;
`;

export const NameInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
`;