import styled from "styled-components";
import { lighten } from "polished";

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const MenuTabs = styled.div`
  cursor: pointer;
  padding: 12px;
  font-size: 18px;
  font-family: "Livvic", sans-serif;
  font-weight: 500;
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;
