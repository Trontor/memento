import { lighten } from "polished";
import styled from "styled-components";

export const SettingsWrapper = styled.div`
  background-color: white;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  padding: 0 30px;
  border-radius: 8px;
`;

export const MembersList = styled.li`
  margin-top: 10px;
  border: 1px solid ${props => lighten(0.67, props.theme.palette.text)};
  list-style: none;
  border-radius: 8px;
  background-color: white;
`;

export const Member = styled.ul`
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

export const AdminTag = styled.span`
  cursor: pointer;
  color: ${props => props.theme.palette.main};
  display: 
`