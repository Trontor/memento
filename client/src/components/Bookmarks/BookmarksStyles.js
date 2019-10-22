import { lighten, transparentize } from "polished";

import { AuthorAvatar } from "../MementoCard/MementoCardStyles";
import { BookBookmark } from "styled-icons/boxicons-regular/BookBookmark";
import { CardOptions } from "../MementoCard/MementoCardStyles";
import styled from "styled-components";

export const BookmarksWrapper = styled.div`
  display: grid;
  grid-gap: 16px;

  @media screen and (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const BookmarkCard = styled.div`
  border: 1px solid ${props => transparentize(0.95, props.theme.palette.text)};
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.palette.foreground};
  box-shadow: 1px 2px 3px -2px ${props => transparentize(0.97, props.theme.palette.text)};

  img {
    width: 100%;
    height: 220px;
    object-fit: contain;
  }
`;

export const BookmarkImg = styled.div`
  background-color: ${props => props.theme.palette.foreground};
  width: 100%;
  /* border-bottom: 1px solid ${props =>
    transparentize(0.95, props.theme.palette.text)}; */
  padding: 12px;

  MementoDescription{
    height: 150px;
  }
`;

export const BookmarkContent = styled.div`
  padding: 0 16px;
  display: grid;
  grid-template-rows: auto 1.2em 1.2em 1.2em;

  h3 {
    font-size: 15px;
  }
`;

export const UploaderBox = styled.div`
  display: flex;
  padding: 12px 16px 12px 16px;

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0;
    cursor: pointer;
  }
`;

export const UploaderText = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 14px;

  span:first-child {
    font-weight: bold;
    letter-spacing: 0.02em;
  }

  span:last-child {
    opacity: 0.7;
  }
`;

export const UploaderAvatar = styled(AuthorAvatar)`
  margin-right: 8px;

  i {
    font-size: 38px;
  }

  img {
    height: 38px;
    width: 38px;
  }
`;

export const BookmarksIcon = styled(CardOptions)`
  margin-top: 7px;
`;

export const NoBookmarksIcon = styled(BookBookmark)`
  color: ${props => lighten(0.1, props.theme.palette.main)};
`;

export const IconButton = styled.div`
  color: ${props => props.theme.palette.main};
  margin: auto;
  font-size: 20px;
`;
