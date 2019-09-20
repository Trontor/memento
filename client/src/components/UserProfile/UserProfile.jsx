import React from "react";
import { CenterText, Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import { UserAvatar, ImgPreview, InputLabel } from "ui/Forms";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { ProfileField, Title } from "./UserProfileStyles";

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

      <ImgPreview>{ProfilePicture}</ImgPreview>
      <CenterText>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
      </CenterText>

      <ProfileField>
        <Title>Email: {user.email}</Title>
      </ProfileField>

      <ProfileField>
        <Title>Birthday: 23/02/00</Title>
      </ProfileField>

      <ProfileField>
        <Title>Gender: Female</Title>
      </ProfileField>

      <Title>Place of Birth: Indonesia </Title>
      <Title>Places I've Lived: Jakarta 2000-2016</Title>
      <Title>Email: {user.email}</Title>
    </Container>
  );
}
