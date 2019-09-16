import styled, {css} from "styled-components";
import { lighten } from "polished";
import { Group } from "styled-icons/material/Group";
import { NavigateNext } from "styled-icons/material/NavigateNext";
import { UserPlus } from "styled-icons/boxicons-regular/UserPlus";

export const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
  margin: 100px auto;
  text-align: center;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${props => lighten(0.68, props.theme.palette.text)};
  background-color: white;
  border-radius: 8px;

  @media screen and (min-width: ${props =>
    props.theme.breakpoints.tabletLandscape}) {
    width: 600px;
  }

  h2 {
    line-height: 1em;
    padding: 0 20px;
  }

`;

export const GoToButton = styled(NavigateNext)`
  color: ${props => lighten(0.6, props.theme.palette.text)};
  width: 36px;
  margin: 0 auto;

  @media screen and (min-width: ${props =>
    props.theme.breakpoints.mobile}) {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
  }

`;

export const DashboardButtons = styled.div`
    display: grid;
    grid-template-columns: 100%;
    cursor: pointer;

    &:first-of-type {
      margin-bottom: 20px;
    }

    &:hover ${GoToButton} {
      color: ${props => lighten(0.1, props.theme.palette.main)};
    }

  @media screen and (min-width: ${props =>
    props.theme.breakpoints.mobile}) {
    width: 100%;
    display: grid;
    grid-template-columns: 50px auto 70px;
    text-align: left;
    padding: 8px 10px;
    background: white;

    &:first-of-type {
      border-bottom: 0;
      border-radius: 10px 10px 0 0;
      margin-bottom: 0;
    }

    &:last-of-type {
      border-radius: 0 0 10px 10px;
      padding-bottom: 20px;
    }
  }
`;

export const ButtonHeading = styled.h4`
  padding-left: 10px;
  margin: 0;

  span {
    display: block;
    padding-top: 3px;
    font-size: 12px;
    font-weight: normal;
    opacity: 0.8;
    line-height: 1.25em;
  }

  @media screen and (min-width: ${props =>
    props.theme.breakpoints.mobile}) {
    margin: 10px 0;
  }
`;

const ButtonIcons = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.palette.main};
  width: 36px;
  height: 36px;
`;

export const CreateFamily = styled(Group)`
  ${ButtonIcons}
`;

export const InviteFamily = styled(UserPlus)`
  ${ButtonIcons}
`;