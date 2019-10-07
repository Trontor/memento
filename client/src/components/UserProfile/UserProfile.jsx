import { CenterText, Container } from "ui/Helpers";
import {
  //PlaceWrapper,
  ProfileField,
  ProfileWrapper,
  Span,
  UserBday,
  UserLocation,
  UserHome,
  UserGender,
} from "./UserProfileStyles";

import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import { InputLabel, UserAvatar, ImgPreview } from "ui/Forms";
import JollyLoader from "components/JollyLoader/JollyLoader";
import React from "react";
import { useQuery } from "@apollo/react-hooks";

export default function UserProfile() {
  let ProfilePicture = <UserAvatar size="125px" style={{ "margin-left": 0 }} />;
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  let user = {};

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }
  if (loading) {
    return <JollyLoader />;
  }

  if (data && data.currentUser) {
    user = data.currentUser;
  }

  if (user.imageUrl !== null) {
    ProfilePicture = user.imageUrl;
  }

  return (
    <Container>
      <CenterText>
        <Header underline>My Profile</Header>
        <ImgPreview>{ProfilePicture}</ImgPreview>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
      </CenterText>

      <ProfileWrapper>
        <UserBday size="25px" />
        <ProfileField>
          <InputLabel>Date of Birth</InputLabel>
          <Span>{user.dateOfBirth}</Span>
        </ProfileField>
      </ProfileWrapper>

      <ProfileWrapper>
        <UserGender size="30px" />
        <ProfileField>
          <InputLabel>Gender</InputLabel>
          <Span>{user.gender}</Span>
        </ProfileField>
      </ProfileWrapper>

      <ProfileWrapper>
        <UserHome size="25px" />
        <ProfileField>
          <InputLabel>Hometown</InputLabel>
          <Span>Jakarta, Indonesia</Span>
        </ProfileField>
      </ProfileWrapper>

      <ProfileWrapper>
        <UserLocation size="25px" />
        <ProfileField>
          <InputLabel>Current City</InputLabel>
          <Span>{user.location}</Span>
        </ProfileField>
      </ProfileWrapper>

      {/*
      <ProfileField>
        <InputLabel>Place I've Lived</InputLabel>
        <PlaceWrapper>
          <Span>Surabaya</Span>
          <Span> February, 2000 - March, 2001</Span>
        </PlaceWrapper>
        <PlaceWrapper>
          <Span>Jakarta</Span>
          <Span> 2001 - 2016</Span>
        </PlaceWrapper>
        <PlaceWrapper>
          <Span>Melbourne</Span>
          <Span> July, 2016 - now </Span>
        </PlaceWrapper>
      </ProfileField>*/}
    </Container>
  );
}
