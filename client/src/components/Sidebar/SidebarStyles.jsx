import { lighten, transparentize } from "polished";
import styled, { css } from "styled-components";

import { ButtonSecondary } from "../../ui/Buttons";
import { Close } from "styled-icons/material/Close";
import { NavLink } from "react-router-dom";
import { Search } from "styled-icons/boxicons-regular/Search";

export const SidebarContainer = styled.div.attrs({ "data-cy": "sidebar" })`
  min-width: ${props => props.theme.size.sidebar}px;
  border-right: 1px solid ${props => lighten(0.66, props.theme.palette.text)};
  min-height: 100%;
  background: ${props => props.theme.palette.sidebar};
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 18px;
  font-size: 14px;
  z-index: 999;
  margin-left: ${props => -props.theme.size.sidebar}px;
  box-shadow: 2px 2px 3px -2px ${props =>
    lighten(0.67, props.theme.palette.text)};
  transition: transform .4s ease-in-out;
  ${props =>
    props.isOpen &&
    css`
      transform: translateX(${props => props.theme.size.sidebar}px);
      transition: transform 0.4s ease-in-out;
    `}

  @media screen and (min-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
    transform: translateX(${props => props.theme.size.sidebar}px);
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  background: #fcfcfc;
  border-radius: 4px;
  display: flex;
  margin: 10px 0 20px 0;
`;

export const SearchIcon = styled(Search)`
  color: rgba(75, 71, 75, 0.8);
  position: relative;
  transform: translateY(-50%);
  top: 50%;
  left: 12px;
  margin-right: 16px;
  width: 15px;
`;

export const SearchInput = styled.input`
  position: relative;
  background: transparent;
  border: none;
  font-family: "Rubik";
  width: 100%;

  &:focus,
  &:active {
    outline: none;
  }

  &:focus ${SearchBar} {
    border-color: ${props => props.theme.palette.main};
  }
`;

export const FamilyListSection = styled.div`
  border-top: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  margin: 12px 0;

  h3 {
    margin-bottom: 2px;
    font-size: 12.5px;
    font-weight: bold;
    opacity: 0.9;
  }
`;

export const TextList = styled(NavLink)`
  list-style-type: none;
  line-height: 30px;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  font-family: "Livvic";
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    transition: 0.25s ease-in-out;
    transform: translateX(16px);
  }

  &:hover > i {
    ${props => props.theme.mixins.hoverFade};
    color: ${props => lighten(0.05, props.theme.palette.text)};
  }

  &.active {
    span {
      color: ${props => lighten(0.1, props.theme.palette.text)};
      font-weight: 600;
    }

    i {
      color: ${props => props.theme.palette.main};
    }
    /* padding-left: 18px;
    border-radius: 4px;
    background-color: ${props => transparentize(0.9, props.theme.palette.main)} */
  }

  span {
    ${props => props.theme.mixins.hoverFade};
    color: ${props => lighten(0.2, props.theme.palette.text)};
    cursor: pointer;

    &:hover {
      ${props => props.theme.mixins.hoverFade};
      color: ${props => lighten(0.05, props.theme.palette.text)};
    }
  }

  i {
    color: ${props => lighten(0.5, props.theme.palette.text)};
    margin-right: 8px;
    flex-basis: 12px;
  }
`;

export const FamilyList = styled(NavLink)`
  display: flex;
  align-items: center;
  font-family: "Livvic";
  ${props => props.theme.mixins.hoverFade};
  padding: 8px 0;
  color: ${props => transparentize(0.25, props.theme.palette.text)};

  &:hover {
    transition: 0.25s ease-in-out;
    transform: translateX(16px);
  }

  &.active {
    color: ${props => transparentize(0, props.theme.palette.text)};
    font-weight: 600;
  }

  &.active > span> img {
    border-color: ${props => props.familyColour || props.theme.palette.main};
  }
`;

export const FamilyAvatar = styled.span`
  margin-right: 6px;
  margin-bottom: 0;

  img {
    border: 2px solid ${props => transparentize(0.35, props.familyColour || props.theme.palette.main)};
    border-radius: 50%;
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
`;

export const MenuSection = styled.div`
  border-top: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  padding: 12px 0;
`;

export const SignOutButton = styled(ButtonSecondary)`
  margin-top: 60px;
  width: 100%;
`;

export const CloseMenu = styled(Close)`
  color: ${props => lighten(0.5, props.theme.palette.text)};
  cursor: pointer;
  ${props => props.theme.mixins.hoverFade};

  &:hover {
    color: ${props => props.theme.palette.main};
    ${props => props.theme.mixins.hoverFade};
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;

export const NewFamilyGroup = styled.div`
  cursor: pointer;
  font-family: "Livvic";
  font-weight: 600;
  font-size: 12px;
  color: ${props => lighten(0, props.theme.palette.main)};
  ${props => props.theme.mixins.hoverFade};
  border-bottom: 1px solid transparent;
  display: inline-block;

  &:before {
    content: "+";
    display: inline-block;
    padding-right: 6px;
    font-size: 16px;
  }

  &:hover {
    color: ${props => props.theme.palette.main};
    transition: 0.2s ease-in-out;
    transform: translateX(10px);
  }
`;

export const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  margin-top: 24px;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;

  img {
    border: 1px solid ${props => lighten(0.5, props.theme.palette.text)};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  i {
    font-size: 40px;
  }
`;

export const UserName = styled.div`
  font-size: 15px;
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  letter-spacing: 0.03em;
`;
