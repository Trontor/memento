import {
  MementoTag,
  MementoTagsWrapper,
} from "components/MementoCard/MementoCardStyles";

import styled from "styled-components";
import { transparentize } from "polished";

export const Card = styled.div`
  position: relative;
  display: grid;
  background-color: ${props => props.theme.palette.foreground};
  padding: 18px;
  border: 1px solid ${props => transparentize(0.95, props.theme.palette.text)};
  border-radius: 6px;
  grid-gap: 18px;

  h1 {
    font-size: 24px;
    margin-top: 0;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 55% auto;
  }
`;

export const MementoImg = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center center;
    border-radius: 4px;
  }
`;

export const LargerTag = styled(MementoTag)`
  font-size: 13px;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    font-size: 15px;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    font-size: 11px;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 14px;
  }
`;

export const BackButtonDiv = styled.button`
  padding: 10px 10px 10px 0;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;

  span {
    font-family: "Livvic", sans-serif;
    display: inline-block;
    padding-left: 10px;
    padding-top: 2px;
  }

  &:hover {
    opacity: 1;
  }
`;
