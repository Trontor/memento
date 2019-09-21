import { lighten } from "polished";
import styled from "styled-components";

export const SettingsWrapper = styled.div`
  background-color: white;
  border: 1px solid ${props => lighten(0.68, props.theme.palette.text)};
  padding: 0 30px;
  border-radius: 8px;
`;