import { MementoTag, MementoTagsWrapper } from "components/MementoCard/MementoCardStyles";

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

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    grid-template-columns: 45% auto;
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

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.desktop}) {
    font-size: 14px;
  }
`;

export const TagSectionWrapper = styled(MementoTagsWrapper)`
  i {
    font-size: 16px;
  }
`;

export const TagsWrapper = styled.div`
  margin-top: 20px;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
  }
`;