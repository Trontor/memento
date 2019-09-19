import styled from "styled-components";
import { lighten } from "polished";

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

  h1 {
    text-align: center;
  }
`;