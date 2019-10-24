import { NoMementosIcon } from "../FamilyGroup/FamilyGroupStyles";
import styled from "styled-components";

export const FamilyGroup = styled.span`
  font-size: 13px;
  display: block;
  margin-top: 2px;
  font-weight: bold;
  cursor: pointer;
`;

export const NoViewMementoIcon = styled(NoMementosIcon)`
  height: 150px;
`;

export const MementoImg = styled.div`
  img {
    cursor: pointer;
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center center;
    border-radius: 4px;
  }
`;
