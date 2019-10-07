import styled from "styled-components";
import { CardOptions } from "components/MementoCard/MementoCardStyles";
import MementoCard from "../MementoCard/MementoCard";
import { Circle } from "styled-icons/boxicons-solid/Circle";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: ${props => props.theme.palette.foreground};
  margin-bottom: 20px;
  height: auto;
`;

export const List = styled(Circle)`
  color: ${props => props.theme.palette.main};
  margin-right: 10px;
`;

export const ListText = styled.div`
  margin-bottom: 10px;
`;

export const InfoWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
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
