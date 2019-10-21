import { NoMementosIcon } from "../FamilyGroup/FamilyGroupStyles";
import styled from "styled-components";
import { transparentize } from "polished";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: ${props => props.theme.palette.foreground};
  margin-bottom: 16px;
  height: auto;
  border: 1px solid ${props => transparentize(0.95, props.theme.palette.text)};
  border-radius: 4px;

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

export const NoViewMementoIcon = styled(NoMementosIcon)`
  height: 150px;
`;
