import { adjustHue, darken, transparentize } from "polished";
import styled, {css} from "styled-components";

import { ButtonPrimary } from "ui/Buttons";

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
  margin: 0px auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  padding: 60px 0 40px 0;
  align-items: center;
  font-size: 24px;
  justify-content: left;

  i {
    color: ${props => props.familyColour || props.theme.palette.main};
    margin-right: 8px;
    width: 20px;
  }
`;

export const NortonTag = styled.li`
  font-family: "Livvic", sans-serif;
  font-weight: 700;
  color: ${props => transparentize(0.4, props.familyColour || props.theme.palette.main)};
  border: 1px solid ${props => transparentize(0.7, props.familyColour || props.theme.palette.main)};
  display: inline-block;
  padding: 0.3em 0.7em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};
  background-color: ${props => transparentize(0.97, props.familyColour || props.theme.palette.main)};

  &:hover {
    color: ${props => props.familyColour || props.theme.palette.main};
    border-color: ${props => transparentize(0.4, props.familyColour || props.theme.palette.main)};
    background-color: ${props => transparentize(0.9, props.familyColour || props.theme.palette.main)};

    span {
      color: ${props => transparentize(0.4, props.theme.palette.text)};
    }
  }

  span {
    color: ${props => transparentize(0.7, props.theme.palette.text)};
    font-size: 0.7em;
    display: inline-block;
    margin-left: 10px;
  }

  &:first-child {
    margin-left: 0;
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${props => transparentize(0.15, props.theme.palette.main)};
      background-color: ${props => adjustHue(-0.4, transparentize(0.9, props.familyColour || props.theme.palette.main))};
      color: ${props => darken(0.08, props.theme.palette.main)};

      span {
        color: ${props => transparentize(0.2, props.theme.palette.main)};
      }

      &:hover {
        border-color: ${props => transparentize(0.5, props.theme.palette.main)};
        background-color: ${props => transparentize(0.95, props.familyColour || props.theme.palette.main)};
        color: ${props => transparentize(0.3, props.theme.palette.main)};

        span {
          color: ${props => transparentize(0.7, props.theme.palette.text)};
        }
      }
    `};
`;

export const SelectMsg = styled.span`
  font-size: 21px;
  display: block;
  margin-bottom: 30px;
  font-family: "Rubik", sans-serif;
`;

export const NortonRating = styled.div`
  > div {
    margin: 0.75em;
    color: ${props=> transparentize(0.4, props.theme.palette.text)};

     > span {
      color: ${props=> props.theme.palette.main};
     }
  }

  margin-top: 10px;
  color: ${props=> props.theme.palette.main};
  display: block;
  font-size: 0.9em;
  font-weight: bold;
`;

export const DoneBtn = styled(ButtonPrimary)`
  font-size: 24px;
  margin: 30px 0 20px 0;
  padding: 16px 28px;
  border-radius: 6px;
`;