import { Settings } from "styled-icons/material/Settings";
import { center } from "ui/Helpers";
import { lighten } from "polished";
import styled from "styled-components";

export const FamilyImg = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.palette.main};
  border-bottom: 8px solid ${props => lighten(0.1, props.theme.palette.main)};
  margin-top: 50px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin-top: 0;
  }
`;

export const FamilyHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  justify-items: center;
  align-items: center;

  h1 {
    text-align: center;
  }
`;

export const SettingsButton = styled(Settings)`
  color: ${props => lighten(0.6, props.theme.palette.text)};
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    color: ${props => lighten(0.2, props.theme.palette.text)};
  }
`