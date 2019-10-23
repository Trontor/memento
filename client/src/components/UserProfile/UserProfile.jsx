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
import { GET_USER } from "queries/UserQueries";
import { Header } from "ui/Typography";
import { InputLabel, ImgPreview } from "ui/Forms";
import JollyLoader from "components/JollyLoader/JollyLoader";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import moment from "moment";

const formatBirthday = date => {
  const parsedDate = moment.utc(date).local();
  if (parsedDate.isValid()) {
    return parsedDate.format("DD/MM/YYYY");
  } else {
    return "No birthday set";
  }
};

export default function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const { error, loading } = useQuery(GET_USER, {
    variables: { id: params.id },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      if (data && data.user) {
        setUser(data.user);
        console.log(data.user);
      }
    },
  });

  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }
  console.log("User:", user);

  if (loading || !user) {
    return <JollyLoader />;
  }
  return (
    <Container>
      <CenterText>
        <Header underline>Profile</Header>
        {/* Profile Picture */}
        <ImgPreview>
          {!user.imageUrl ? (
            <i className="fas fa-user-circle" />
          ) : (
            <img src={user.imageUrl} alt={user.firstName} />
          )}
        </ImgPreview>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
      </CenterText>

      {/* Birthday */}
      <ProfileWrapper data={user.dateOfBirth}>
        <UserBday size="25px" />
        <ProfileField>
          <InputLabel>Date of Birth</InputLabel>
          <Span>{formatBirthday(user.dateOfBirth)}</Span>
        </ProfileField>
      </ProfileWrapper>

      {/* Gender */}
      <ProfileWrapper data={user.gender}>
        <UserGender size="30px" />
        <ProfileField>
          <InputLabel>Gender</InputLabel>
          <Span>{user.gender}</Span>
        </ProfileField>
      </ProfileWrapper>

      {/* Hometown */}
      <ProfileWrapper data={user.hometown}>
        {console.log(user.hometown)}
        <UserHome size="25px" />
        <ProfileField>
          <InputLabel>Hometown</InputLabel>
          <Span>{user.hometown}</Span>
        </ProfileField>
      </ProfileWrapper>

      {/* Current city */}
      <ProfileWrapper data={user.location}>
        <UserCity size="25px" />
        <ProfileField>
          <InputLabel>Current City</InputLabel>
          <Span>{user.location}</Span>
        </ProfileField>
      </ProfileWrapper>

      {/* Places Lived */}
      <ProfileWrapper data={user.placesLived}>
        <UserPlaces size="25px" />
        <ProfileField>
          <PlaceWrapper>
            <InputLabel>Place I've Lived</InputLabel>
            <InputLabel>Date Moved</InputLabel>
          </PlaceWrapper>
          {user.placesLived.map(place => (
            <PlaceWrapper>
              <Span>{place.city}</Span>
              <Span>{moment(place.dateMoved).format("Do MMM YYYY ")}</Span>
            </PlaceWrapper>
          ))}
        </ProfileField>
      </ProfileWrapper>
    </Container>
  );
}
