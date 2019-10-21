import styled, { css } from "styled-components";
import { Email } from "styled-icons/material/Email";
import { BirthdayCake } from "styled-icons/fa-solid/BirthdayCake";
import { Location } from "styled-icons/icomoon/Location";
import { Home } from "styled-icons/fa-solid/Home";
import { PersonPin } from "styled-icons/material/PersonPin";
import { LocationCity } from "styled-icons/material/LocationCity";

export const ProfileWrapper = styled.div`
  position: relative;
  grid-template-columns: 25px auto;
  grid-gap: 25px;
  display: ${props => (props.data === "true" ? "grid" : "none")};
`;

export const ProfileField = styled.div`
  display: grid;
  grid-template-rows: 40% 40%;
  margin: 15px 0;
  label {
    margin-top: 5px;
  }
`;

export const IconStyle = css`
  color: ${props => props.theme.palette.main};
  margin: auto;
`;

export const UserEmail = styled(Email)`
  ${IconStyle}
`;

export const UserBday = styled(BirthdayCake)`
  ${IconStyle}
`;

export const UserCity = styled(Location)`
  ${IconStyle}
`;
export const UserHome = styled(Home)`
  ${IconStyle}
`;

export const UserGender = styled(PersonPin)`
  ${IconStyle}
`;

export const UserPlaces = styled(LocationCity)`
  color: ${props => props.theme.palette.main};
  margin-top: 25px;
`;

export const Span = styled.span`
  font-size: 20px;
  color: ${props => props.theme.palette.text};
  padding: 5px 0;
`;

export const PlaceWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;
