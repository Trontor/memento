import { CenterText, Container } from "ui/Helpers";
import { FormSection, InputLabel } from "ui/Forms";

import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import React from 'react'
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroupSettings(props) {
  const familyId = props.match.params.id;
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  let user = {};

  if (error) {
    console.log("Error loading user data:", error);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
  }

  return (
    <Container>
      <CenterText>
        <Header center>Family Group Settings</Header>
      </CenterText>
      <FormSection>
        <InputLabel>
          Family Group Name
        </InputLabel>
      </FormSection>
    </Container>
  )
}
