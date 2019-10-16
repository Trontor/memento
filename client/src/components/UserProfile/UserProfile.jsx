import { CenterText, Container } from "ui/Helpers";
import {
  PlaceWrapper,
  ProfileField,
  ProfileWrapper,
  Span,
  UserBday,
  UserCity,
  UserHome,
  UserGender,
  UserPlaces,
} from "./UserProfileStyles";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import { InputLabel, UserAvatar, ImgPreview } from "ui/Forms";
import JollyLoader from "components/JollyLoader/JollyLoader";
import React from "react";
import { useQuery } from "@apollo/react-hooks";

export default function UserProfile() {
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
    console.log(user);
  }

  return (
    <Container>
      <CenterText>
        <Header underline>My Profile</Header>
        <ImgPreview>
          {!user.imageUrl ? (
            <UserAvatar size="125px" style={{ "margin-left": 0 }} />
          ) : (
            <img src={user.imageUrl} alt={user.firstName} />
          )}
        </ImgPreview>
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
          <Span>{user.hometown}</Span>
        </ProfileField>
      </ProfileWrapper>
      <ProfileWrapper>
        <UserCity size="25px" />
        <ProfileField>
          <InputLabel>Current City</InputLabel>
          <Span>{user.location}</Span>
        </ProfileField>
      </ProfileWrapper>
      <ProfileWrapper>
        <UserPlaces size="25px" />

        <ProfileField>
          <PlaceWrapper>
            <InputLabel>Place I've Lived</InputLabel>
            <InputLabel>Date Moved</InputLabel>
          </PlaceWrapper>
          <PlaceWrapper>
            <Span>Amsterdam</Span>
            <Span> March, 2001</Span>
          </PlaceWrapper>
        </ProfileField>
      </ProfileWrapper>
    </Container>
  );
}
