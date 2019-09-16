import styled, { css } from "styled-components";
import { lighten } from "polished";

export const FamilyImg = styled.div`
  width: 100%;
  height: 200px;
  background-color:  ${props => props.theme.palette.main};
  border-bottom: 8px solid ${props => lighten(0.1, props.theme.palette.main)};
  margin-top: 50px;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    margin-top: 0;
  }
`;

export const FamilyHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};

  h1 {
    text-align: center;
  }
`;

export const FamilyMenu = styled.div`
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