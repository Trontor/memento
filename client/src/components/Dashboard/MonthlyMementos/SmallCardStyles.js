import { lighten, transparentize } from "polished";

import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid ${props => transparentize(0.93, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  position: relative;
  border-radius: 5px;
  display: flex;
  box-shadow: 1px 1px 6px ${props => transparentize(0.97, props.theme.palette.text)};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    width: 100%;
    margin-top: 0;
    margin-bottom: ${props => props.theme.size.gutterWidth};
  }
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;

  span {
    font-size: 12px;
    opacity: 0.8;
  }
`;

export const AuthorAvatar = styled.div`
  display: none;
  margin-right: 8px;

  img {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    object-fit: cover;
  }

  i {
    font-size: 32px;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.desktop}) {
    display: block;
  }
`;

export const MementoAuthor = styled.div`
  font-weight: bold;
  letter-spacing: 0.02em;
`;

export const CardContent = styled.div`
  flex: 1 0 50%;
`;

export const MementoInfo = styled.div`
  flex: 1 0 55%;
`;

export const MementoOverview = styled.div`
  line-height: 1.5em;
  margin-bottom: 16px;
  font-size: 14px;
  min-height: 3em;

  i {
    color: ${props => props.familyColour || props.theme.palette.main};
    justify-content: left;
  }

  > span {
    text-transform: capitalize;
    display: grid;
    grid-template-columns: 24px auto;
    align-items: baseline;
  }
`;

export const MementoTitle = styled.div`
  font-family: "Livvic", sans-serif;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.02em;
  margin-bottom: 8px;
`;

export const MementoCoverImg = styled.div`
  overflow: hidden;
  border-radius: 4px;
  flex-basis: 0 0 45%;
  margin-right: 16px;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    object-position: center center;
  }
`;

export const MementoDescription = styled.div`
  margin-bottom: 10px;
  opacity: 0.8;
`;

export const Divider = styled.span`
  display: inline-block;
  margin: 0 4px;
  opacity: 0.6;
`;


export const PeopleTags = styled.span`
  &::after {
    display: inline;
    content: ", ";
  }

  &:last-child {
    &::after {
      content: none;
    }
  }
`;

export const CardOptions = styled.span`
  margin-left: auto;
  color: ${props => lighten(0.6, props.theme.palette.text)};
  align-self: flex-start;
  font-size: 18px;

  i {
    &:not(:last-child) {
      margin-right: 12px;
      cursor: pointer;
    }

    &:hover {
      color: ${props => props.familyColour || props.theme.palette.main};
    }
  }
`;
