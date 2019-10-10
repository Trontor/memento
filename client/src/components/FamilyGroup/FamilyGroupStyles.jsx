import { ButtonPrimaryLight, ButtonSecondary } from "ui/Buttons";
import { Container, center } from "ui/Helpers";
import { adjustHue, lighten } from "polished";
import styled, { css } from "styled-components";

export const FamilyContainer = styled(Container)`
  margin: 0;
  position: relative;

  @media screen and (min-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0;
    position: relative;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
  }
`;

export const FamilyLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    grid-template-columns:
      minmax(260px, 312px)
      minmax(480px, 600px);
    grid-template-rows: 100%;
    grid-column-gap: ${props => props.theme.size.gutterWidth};
    margin: 0 ${props => props.theme.size.gutterWidth};
  }
`;

export const SideMenu = styled.section`
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    width: 100%;
    height: 100vh;
    position: sticky;
    overflow: hidden auto;
    padding: ${props => props.theme.size.gutterWidth} 0;
    top: 0;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
`;
export const MainViewer = styled.section`
  display: none;
  padding: ${props => props.theme.size.gutterWidth} 0;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    height: 100%;
    display: block;
  }
`;

export const FamilyProfileContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border-bottom: 1px solid ${props => lighten(0.6, props.theme.palette.text)};

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    background-color: ${props => props.theme.palette.foreground};
    border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  }
`;

export const FamilyImg = styled.div`
  width: 100%;
  height: 240px;
  background-color: ${props => props.familyColour};
  border-bottom: 8px solid ${props => lighten(0.1, props.familyColour)};

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    margin-top: 0;
    height: 128px;
  }
`;

export const FamilyHeader = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: 40px 40px auto 40px 40px;
  padding: 0 20px;
  justify-items: center;
  align-items: center;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    border: none;
    grid-template-columns: 1fr;
    justify-items: left;
    padding: 17px;

    h1 {
      display: inline-block;
      margin: 0 auto;
      font-size: 18px;
    }
  }
`;

export const ProfilePhotoContainer = styled.div`
  margin: 0 auto;
  width: 136px;
  height: 136px;
  position: relative;
  top: -72px;
  background-color: ${props => props.theme.palette.foreground};
  border-radius: 5px;
  margin-bottom: -64px;

  img {
    ${center};
    width: ${props => (props.thick ? "118px" : "128px")};
    height: ${props => (props.thick ? "118px" : "128px")};
    object-fit: cover;
    border-radius: 5px;
  }


  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    margin-bottom: -72px;
  }
`;

export const SideMenuSectionContainer = styled.section`
  display: none;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: block;
    background-color: ${props => props.theme.palette.foreground};
    border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
    list-style: none;
    border-radius: 4px;
    margin-top: ${props => props.theme.size.gutterWidth};
  }
`;

export const SideMenuSectionHeader = styled.div`
  display: none;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: block;
    border-bottom: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
    padding: 16px;

    h2 {
      font-size: 16px;
      margin: 0;
    }
  }
`;

export const GroupDetails = styled.div`
  display: grid;
  grid-template-columns: 14px auto;
  grid-column-gap: 8px;
  padding-bottom: 8px;
  align-items: center;

  i {
    font-size: 12px;
  }
`;

export const DetailsWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: block;
    margin-top: 16px;

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export const MemberRow = styled.div`
  margin: 0;
  padding: 12px 16px;
  border-bottom: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  display: grid;
  grid-template-columns: min-content 1fr auto;
  grid-column-gap: 12px;
  align-items: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  img {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    object-fit: cover;
  }

  i {
    font-size: 38px;
  }

  &:hover {
    background-color: ${props => lighten(0.71, props.theme.palette.text)};
  }

  span {
    display: block;

    &:first-child {
      font-weight: bold;
      letter-spacing: 0.02em;
    }

    &:last-child {
      opacity: 0.8;
    }
  }
`;

export const TagRow = styled.div`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 12px 16px;
  border-bottom: 1px solid ${props => lighten(0.68, props.theme.palette.text)};
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      adjustHue(-10, lighten(0.295, props.theme.palette.main))};
  }

  ${({ selected }) =>
    selected &&
    css`
      box-shadow: inset 3px 0 0 ${props => props.theme.palette.main};
      background-color: ${props => lighten(0.3, props.theme.palette.main)};
    `};

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    font-size: 13px;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    margin-bottom: 0;
  }
`;

export const SettingsButton = styled(ButtonSecondary)`
  color: ${props => props.theme.palette.main};
  border-radius: 5px;
  padding: 0;
  width: 38px;
  height: 38px;
  font-size: 18px;

  &:hover {
    color: ${props => props.theme.palette.main};
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    margin: 0 auto;
    width: 28px;
    height: 28px;
    position: absolute;
    right: 16px;
    top: 16px;
    color: white;
    opacity: 0.7;
    border: none;

    &:hover {
      color: white;
      opacity: 1;
      background-color: transparent;
      border: none;
    }

    i {
      font-size: 20px;
      margin-right: 0;
    }

    span {
      display: none;
    }
  }
`;

export const UploadButton = styled(ButtonPrimaryLight)`
  align-items: center;
  border-radius: 5px;
  height: 38px;
  margin-right: 8px;
  font-size: 14px;
  padding: 9px 16px;

  color: ${props => props.familyColour || props.theme.palette.main};
  background: ${props =>
    lighten(0.25, props.familyColour || props.theme.palette.main)};
  border: 1px solid
    ${props => lighten(0.25, props.familyColour || props.theme.palette.main)};

  &:hover {
    background: ${props =>
      lighten(0.27, props.familyColour || props.theme.palette.main)};
    border: 1px solid
      ${props => lighten(0.27, props.familyColour || props.theme.palette.main)};
  }

  i {
    display: inline-block;
    margin-right: 8px;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: block;
    width: auto;
    height: auto;
    margin: 0 auto 16px auto;

    span {
      display: inline-block;
    }

    i {
      margin-right: 8px;
    }
  }
`;

export const FeatherButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${props => lighten(0.6, props.theme.palette.text)};
  display: flex;
  align-items: center;
  margin-right: 20px;

  &:hover {
    border-color: ${props => lighten(0.2, props.theme.palette.main)};
  }

  &:hover > i {
    color: ${props => props.theme.palette.main};
  }

  i {
    display: block;
    color: ${props => props.theme.palette.main};
    font-size: 20px;
    margin: 0 auto;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;

export const Menu = styled.div`
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;

export const TabComponent = styled.div`
  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLandscape}) {
    display: none;
  }
`;

export const MementoSearch = styled.div`
  padding: 8px 16px;
  background-color: ${props => props.theme.palette.background};
  border-bottom: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 1px solid ${props => lighten(0.65, props.theme.palette.text)};
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 15px;

  &:focus,
  &:active {
    outline: none;
  }
`;
