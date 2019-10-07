import styled from "styled-components";
import { CardOptions } from "components/MementoCard/MementoCardStyles";
import MementoCard from "../MementoCard/MementoCard";
import { Circle } from "styled-icons/boxicons-solid/Circle";

export const Card = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: ${props => props.theme.palette.foreground};
  margin-bottom: 20px;
`;

export const List = styled(Circle)`
  color: ${props => props.theme.palette.main};
  margin-right: 10px;
`;

export const InfoWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const CardInfo = styled.div`
  margin: 20px;
`;
export const BookmarksIcon = styled(CardOptions)`
  margin: auto;
`;
