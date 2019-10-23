import styled from "styled-components";
import { transparentize } from "polished";

export const NortonBox = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${props => transparentize(0.95, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  position: relative;
  border-radius: 16px;
  box-shadow: 1px 1px 16px ${props => transparentize(0.95, props.theme.palette.text)};
`;

export const NortonMsg = styled.div`
  font-family:"Livvic", sans-serif;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

export const MementoName = styled.span`
  color: ${props => props.theme.palette.main};
  font-size: 700;
`;

export const NortonTagsWrapper = styled.ul`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
  margin: 0;
  align-items: center;
  font-size: 48px;

  i {
    color: ${props => props.familyColour || props.theme.palette.main};
    margin-right: 8px;
    width: 20px;
  }

  &:last-of-type {
    margin-top: 0.6em;

    &:first-child {
      margin: 0;
    }
  }
`;

export const NortonTag = styled.li`
  font-family: "Livvic", sans-serif;
  font-weight: 700;
  color: ${props => props.familyColour || props.theme.palette.main};
  border: 1px solid ${props => transparentize(0.8, props.familyColour || props.theme.palette.main)};
  display: inline-block;
  padding: 0.5em 0.7em;
  margin-right: 0.2em;
  margin-bottom: 0.2em;
  border-radius: 0.3em;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};
  background-color: ${props => transparentize(0.95, props.familyColour || props.theme.palette.main)};

  &:hover {
    color: ${props => props.familyColour || props.theme.palette.main};
    border-color: ${props => transparentize(0.7, props.familyColour || props.theme.palette.main)};
    box-shadow: inset 0 0 0 1px ${props => transparentize(0.7, props.familyColour || props.theme.palette.main)};
  }
  span {
    color: gray;
    font-size: 10px;
  }
`;