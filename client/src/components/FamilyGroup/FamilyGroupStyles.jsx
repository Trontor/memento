import { Container, center } from "ui/Helpers";

import { ButtonPrimary } from "ui/Buttons";
import { Settings } from "styled-icons/material/Settings";
import { lighten } from "polished";
import styled from "styled-components";

export const FamilyContainer = styled(Container)`
  @media screen and (min-width: ${props =>
  props.theme.breakpoints.mobile}) {
    margin: 0;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export const FamilyLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    grid-template-columns:
      minmax(240px, 320px)
      minmax(600px, 968px);
    grid-column-gap: 24px;
    padding: 0 24px;
  }
`;

export const SideMenu = styled.section`
  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    height: 100vh;
    position: sticky;
  }
`
export const FamilyProfileContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin-top: 24px;
  }
`

export const TagsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  border: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
`

export const FamilyImg = styled.div`
  width: 100%;
  height: 240px;
  background-color: ${props => props.theme.palette.main};
  border-bottom: 8px solid ${props => lighten(0.1, props.theme.palette.main)};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin-top: 0;
    height: 128px;
  }
`;

export const FamilyHeader = styled.div`
  max-width: 100%;
  border-top: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  justify-items: center;
  align-items: center;

  h1 {
    text-align: center;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    border: none;
    grid-template-columns: 1fr;
    /* justify-items: left;
    padding: 12px; */
  }
`;

export const ProfilePhotoContainer = styled.div`
  margin: 0 auto;
  width: 136px;
  height: 136px;
  position: relative;
  top: -72px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: -48px;

  img {
    ${center};
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 5px;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    margin-bottom: -72px;
  }
`

export const MembersList = styled.li`
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  list-style: none;
  border-radius: 8px;
`

export const MemberRow = styled.ul`
  font-family: "Livvic", sans-serif;
  font-weight: bold;
  font-size: 15px;
  margin: 0;
  padding: 20px 15px;
  border-bottom: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  display: grid;
  grid-template-columns: 1fr 50px;

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingsButton = styled(Settings)`
  color: ${props => lighten(0.6, props.theme.palette.text)};
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    color: ${props => lighten(0.2, props.theme.palette.text)};
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`

export const Menu = styled.div`
  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`

export const UploadButton = styled(ButtonPrimary)`
  width: 100%;
  display: none;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    display: block;
  }
`