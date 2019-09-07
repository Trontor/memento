import styled from "styled-components";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import { lighten } from "polished";
import { NewGroup } from "ui/Buttons";

export const SettingsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;
  border-bottom: 1px solid ${props => lighten(0.35, props.theme.palette.text)};
`;

export const HeaderButton = styled.h2`
  text-align: center;
  margin: 0;
  padding: 15px 0 15px 0;
  border-radius: 5px;
  background: ${props => (props.menuClick ? "pink" : "white")};
  color: ${props => (props.menuClick ? "red" : "black")};

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.palette.main};
  }
`;

export const SettingsContainer = styled.div`
  display: ${props => (props.menuClick ? "block" : "none")};
  background: white;
  height: 500px;
  padding-top: 50px;
`;

export const UploadPhoto = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
`;

export const UploadLabel = styled.label`
  font-size: 16px;
  color: ${props => props.theme.palette.main};
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadButton = styled(NewGroup)`
  color: ${props => props.theme.palette.main};
`;
