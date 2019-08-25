import styled from "styled-components";
import { Menu } from "styled-icons/feather/Menu";
import { Close } from "styled-icons/evil/Close";
import { PlusCircle } from "styled-icons/boxicons-regular/PlusCircle";
import { Edit } from "styled-icons/material/Edit";
import { Settings } from "styled-icons/material/Settings";
import { AddToQueue } from "styled-icons/boxicons-regular/AddToQueue";
import { GroupAdd } from "styled-icons/material/GroupAdd";

export const ButtonPrimary = styled.button`
  background: ${props => props.theme.palette.main};
  color: white;
  border: 1px solid ${props => props.theme.palette.main};
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 4px;
  ${props => props.theme.mixins.hoverFade};
  margin-right: 20px;

  &:hover {
    border: 1px solid ${props => props.theme.palette.secondary};
    background: ${props => props.theme.palette.secondary};
    ${props => props.theme.mixins.hoverFade};
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonSecondary = styled.button`
  border: 1px solid ${props => props.theme.palette.main};
  color: ${props => props.theme.palette.main};
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-block;
  font-size: 15px;
  ${props => props.theme.mixins.hoverFade};
`;

export const MenuButton = styled(Menu)`
  background: transparent;
  position: relative;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export const CloseMenuButton = styled(Close)`
  margin: 15px;
  background: transparent;
  color: black;
  position: relative;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

export const NewGroup = styled(PlusCircle)`
  color: gray;
  margin-right: 10px;
`;

export const NewArtefact = styled(AddToQueue)`
  color: gray;
  margin-right: 10px;
`;

export const EditProfile = styled(Edit)`
  color: gray;
  margin-right: 10px;
`;

export const Setting = styled(Settings)`
  color: gray;
  margin-right: 10px;
`;

export const Invite = styled(GroupAdd)`
  color: gray;
  margin-right: 10px;
`;
