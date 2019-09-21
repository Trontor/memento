import "react-datepicker/dist/react-datepicker.css";

import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import styled, { css } from "styled-components";

import { ButtonSecondary } from "ui/Buttons";
import { Cancel } from "styled-icons/material/Cancel";
import DatePicker from "react-datepicker";
import { EditProfile } from "ui/Buttons";
import { User } from "styled-icons/fa-regular/User";

export const SettingsContainer = styled.div`
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
  left: 100%;
  font-size: 16px;
  color: ${props => props.theme.palette.main};
  display: block;
  text-align: center;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const ImgPreview = styled.div`
  display: block;
  margin: 0 auto;
  background: #f8f8f8;
  height: 200px;
  width: 200px;
  border: 2px solid gray;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserAvatar = styled(User)`
  color: gray;
  margin: 35px 0 0 35px;
`;

export const Calendar = styled(DatePicker)`
  height: 40px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.text};
  padding: 6px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.palette.border};
`;

const PickerStyle = css`
  margin: 10px 10px 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.palette.text};
  border: none;
  height: 40px;
  width: 40%;
  background: transparent;
  border: 1px solid ${props => props.theme.palette.border};
`;

export const CountryPicker = styled(CountryDropdown)`
  ${PickerStyle}
`;

export const CityPicker = styled(RegionDropdown)`
  ${PickerStyle}
`;

export const PlaceWrapper = styled.div`
  display: grid;
  grid-template-columns: 55% 40% 5%;
`;

export const AccountButton = styled(ButtonSecondary)`
  margin-top: 15px;
  font-weight: bold;
`;

const IconButtonStyle = css`
  color: #4cd4ff;
  margin-left: 20px;
  float: right;
  cursor: pointer;
`;

export const EditAccountButton = styled(EditProfile)`
  ${IconButtonStyle}
  display: ${props => (props.editClick ? "none" : "block")};
`;

export const CancelButton = styled(Cancel)`
  ${IconButtonStyle}
  display: ${props => (props.editClick ? "block" : "none")};
`;

export const SectionWrapper = styled.div`
  display: ${props => (props.editClick ? "block" : "none")};

  input {
    margin-top: 10px;
  }
`;

export const PlacesList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5px;
`;
