import styled, {css} from "styled-components";
import { lighten } from "polished";
import { Group } from "styled-icons/material/Group";
import { NavigateNext } from "styled-icons/material/NavigateNext";
import { UserPlus } from "styled-icons/boxicons-regular/UserPlus";

export const TextWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 580px;
  padding: 20px 0 0 0;
  margin: 100px auto;
  text-align: center;
  color: ${props => props.theme.palette.text};
  border: 1px solid ${props => lighten(0.68, props.theme.palette.text)};
  background-color: white;
  border-radius: 8px;

  h2 {
    margin-bottom: 25px;
    padding: 0 20px;
  }

`;

export const GoToButton = styled(NavigateNext)`
  color: ${props => lighten(0.6, props.theme.palette.text)};
  width: 48px;
  position: relative;
  top: 50%;
  transform: translate(50%, -50%);
`;

export const DashboardButtons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 70px auto 70px;
  text-align: left;
  padding: 8px 20px;
  cursor: pointer;
  background: white;

  &:hover ${GoToButton} {
    color: ${props => lighten(0.1, props.theme.palette.main)};
  }

  &:first-of-type {
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 10px 10px;
    padding-bottom: 20px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
  }
`;

export const ButtonHeading = styled.h4`
  padding: 0 10px;

  span {
    display: block;
    padding-top: 5px;
    font-size: 12px;
    font-weight: normal;
    opacity: 0.8;
  }
`;

const ButtonIcons = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.palette.main};
  width: 40px;
  height: 40px;
`;

export const CreateFamily = styled(Group)`
  ${ButtonIcons}
`;

export const InviteFamily = styled(UserPlus)`
  ${ButtonIcons}
`;