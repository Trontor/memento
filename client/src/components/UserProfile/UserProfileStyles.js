import styled, { css } from "styled-components";
import { ImgPreview } from "ui/Forms";
import { Email } from "styled-icons/material/Email";
import { BirthdayCake } from "styled-icons/fa-solid/BirthdayCake";
import { Location } from "styled-icons/icomoon/Location";

export const ProfileWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 30% 70%;
`;

export const ProfileField = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 5px 0;
`;

export const Title = styled.h2`
  font-size: 25px;
  letter-spacing: 0.01em;
  margin: 10px 5px;
`;

export const UserImg = styled(ImgPreview)`
  margin: 0;
`;

export const IconStyle = css`
  color: ${props => props.theme.palette.main};
  margin-right: 5px;
`;

export const UserEmail = styled(Email)`
  ${IconStyle}
`;

export const UserBday = styled(BirthdayCake)`
  ${IconStyle}
`;

export const UserLocation = styled(Location)`
  ${IconStyle}
`;

export const Span = styled.span`
  font-size: 20px;
  color: ${props => props.theme.palette.text};
  padding: 5px 0;
  margin-top: 15px;
`;

export const PlaceWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 50% 50%;
`;
