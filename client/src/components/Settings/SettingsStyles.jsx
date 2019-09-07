import styled from "styled-components";
import { ButtonSecondary } from "ui/Buttons";
import { NewGroup } from "ui/Buttons";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SettingsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;
`;

export const HeaderButton = styled(ButtonSecondary)`
  display: block;
  width: 100%;
  margin: 0 auto;
  border-radius: 0;
  border: none;
  border-bottom: ${props =>
    props.menuClick ? "4px solid orange" : "1px solid  gray "};
  background: ${props =>
    props.menuClick ? "rgba(255, 132, 77, 0.12)" : "white"};
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

export const Calendar = styled(DatePicker)`
  height: 40px;
  width: 150%;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.text};
  padding: 6px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.palette.border};
`;

export const CountryPicker = styled(CountryDropdown)`
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.text};
  border: none;
  height: 40px;
  width: 50%;
  background: transparent;
  border: 1px solid ${props => props.theme.palette.border};
`;

export const CityPicker = styled(RegionDropdown)`
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.text};
  border: none;
  height: 40px;
  width: 50%;
  background: transparent;
  border: 1px solid ${props => props.theme.palette.border};
`;
