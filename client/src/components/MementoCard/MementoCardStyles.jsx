import { lighten } from "polished";
import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 18px 20px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  margin-bottom: ${props => props.theme.size.gutterWidth};
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-top: ${props => props.theme.size.gutterWidth};
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    border-radius: 4px;
    margin-top: 0;

    &:first-child {
    margin-top: 0;
  }
  }
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const AuthorAvatar = styled.div`
  margin-right: 8px;

  img {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    object-fit: cover;
  }

  i {
    font-size: 38px;
  }
`;

export const MementoAuthor = styled.div`
  font-weight: bold;
  letter-spacing: 0.02em;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MementoInfo = styled.div`
  flex: 1 0 55%;
`;

export const MementoOverview = styled.div`
  line-height: 1.5em;
  margin-bottom: 16px;
  margin-right: 16px;

  i {
    color: ${props => props.theme.palette.main};
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
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.02em;
  margin-bottom: 8px;
`;

export const MementoCoverImg = styled.div`
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 334px;
  height: auto;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    object-fit: cover;
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

export const UploadDate = styled.span`
  opacity: 0.7;
  font-size: 13px;
  display: block;
  margin-top: 2px;
`;

export const MementoTagsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
  margin: 0;
  align-items: center;

  i {
    color: ${props => props.theme.palette.main};
    margin-right: 8px;
  }
`;

export const MementoTags = styled.li`
  font-family: "Livvic", sans-serif;
  font-size: 11px;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  display: inline-block;
  padding: 6px 10px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    color: ${props => props.theme.palette.main};
    border-color: ${props => lighten(0.2, props.theme.palette.main)};
    box-shadow: inset 0 0 0 1px ${props => lighten(0.2, props.theme.palette.main)};
    /* color: ${props => props.theme.palette.main} */
  }
`;

export const PeopleTags = styled.span`

  &::after {
    display: inline;
    content: ', ';
  }

  &:last-child {
    &::after {
      content: none;
    }
  }
`;

export const BookmarkButton = styled.span`
  margin-left: auto;
  color: ${props => lighten(0.6, props.theme.palette.text)};
  cursor: pointer;
  align-self: flex-start;
  font-size: 18px;

  &:hover {
    color: ${props => props.theme.palette.main};
  }
`