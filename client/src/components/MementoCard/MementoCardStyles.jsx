import styled , {css} from "styled-components";

import { lighten } from "polished";

export const Card = styled.div`
  width: 100%;
  padding: 18px 20px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  background-color: ${props => props.theme.palette.foreground};
  margin-top: 12px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    border-radius: 4px;
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
`;

export const MementoOverview = styled.div`
  i {
    color: ${props => props.theme.palette.main};
    justify-content: left;
  }

  > div {
    text-transform: capitalize;
    display: grid;
    grid-template-columns: 24px auto;
    align-items: baseline;
  }

  line-height: 1.5em;
  margin-bottom: 16px;
`;

export const MementoTitle = styled.div`
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  letter-spacing: 0.03em;
  margin-bottom: 8px;
`;

export const MementoCoverImg = styled.div`
  margin-bottom: 10px;

  img {
    width: 100%;
    border-radius: 3px;
  }
`;

export const MementoDescription = styled.div`
  margin-bottom: 10px;
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
  margin-bottom: 0;
  align-items: center;

  i {
    color: ${props => props.theme.palette.main};
    margin-right: 12px;
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
    border-color: ${props => lighten(0.1, props.theme.palette.main)};
    box-shadow: inset 0 0 0 1px ${props => lighten(0.1, props.theme.palette.main)};
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