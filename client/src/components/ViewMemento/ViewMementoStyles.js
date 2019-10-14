import styled from "styled-components";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: ${props => props.theme.palette.foreground};
  margin-bottom: 20px;
  height: auto;

  @media screen and (max-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    grid-template-columns: 1fr;
  }
`;

export const CardInfo = styled.div`
  margin: 20px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const FamilyGroup = styled.span`
  opacity: 0.7;
  font-size: 13px;
  display: block;
  margin-top: 2px;
`;
