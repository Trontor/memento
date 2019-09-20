import React from "react";
import { CenterText, Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { UserAvatar, InputLabel } from "ui/Forms";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import {
  ProfileField,
  Title,
  ProfileWrapper,
  UserImg,
  UserEmail,
  UserBday,
  UserLocation,
  PlaceWrapper,
  Span,
} from "./UserProfileStyles";

export default function UserProfile() {
  let ProfilePicture = <UserAvatar size="125px" />;
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  let user = {};

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
  }

  return (
    <Container>
      <CenterText>
        <Header underline>My Profile</Header>
      </CenterText>

      <ProfileWrapper>
        <UserImg>{ProfilePicture}</UserImg>
        <div>
          <Title>
            {user.firstName} {user.lastName}
          </Title>

          <ProfileField>
            <UserLocation size="25px" />
            <Span>Melbourne, Australia</Span>
          </ProfileField>

          <ProfileField>
            <UserBday size="25px" />
            <Span>23/02/00</Span>
          </ProfileField>

          <ProfileField>
            <UserEmail size="25px" />
            <Span>{user.email}</Span>
          </ProfileField>
        </div>
      </ProfileWrapper>

      <ProfileField>
        <InputLabel>Gender</InputLabel>
        <Span>Female</Span>
      </ProfileField>

      <ProfileField>
        <InputLabel>Place of Birth</InputLabel>
        <Span>Indonesia</Span>
      </ProfileField>

      <ProfileField>
        <InputLabel>Place I've Lived</InputLabel>
        <PlaceWrapper>
          <Span>Surabaya, Indonesia</Span>
          <Span> February, 2000 - March, 2000</Span>
        </PlaceWrapper>
        <PlaceWrapper>
          <Span>Jakarta, Indonesia</Span>
          <Span> 2000 - 2016</Span>
        </PlaceWrapper>
        <PlaceWrapper>
          <Span>Melbourne, Australia</Span>
          <Span> July, 2016 - now </Span>
        </PlaceWrapper>
      </ProfileField>
    </Container>
  );
}
