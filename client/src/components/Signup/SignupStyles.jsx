import styled from "styled-components";

export const SignupContainer = styled.div`
  margin: 30px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}){
    margin: 50px;
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
  grid-template-columns: 50% 50%;
`;

export const FirstName = styled.div`
  margin-right: 10px;
`;

export const LastName = styled.div`
  margin-left: 10px;
`;