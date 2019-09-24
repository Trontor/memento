import { AdminTag, Member, MembersList } from "./FamilyGroupSettingsStyles";
import { BackButton, BackToView, SettingsHeader } from "ui/Navigation";
import {
  FormSection,
  InputLabel
} from "ui/Forms";

import { CirclePicker } from "react-color";
import { Container } from "ui/Helpers";
import EditInput from "components/EditInput/EditInput";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import React from 'react'
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroupSettings(props) {
  const familyId = props.match.params.id;
  const { data, loading, /* error */} = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
  });

  if (loading) {
    return <JollyLoader />;
  }

  let familyName, members;

  if (data) {
    familyName = data.family.name;
    members = data.family.members;
    console.log(members);
  }

  return (
    <Container>
      <SettingsHeader>
        <BackToView>
          <BackButton onClick={() => props.history.push("/family/" + familyId)}/>
        </BackToView>
        <Header center>Family Group Settings</Header>
        <div></div>
      </SettingsHeader>
        <FormSection>
          <EditInput
            value={familyName}
            inputLabel="Family Name"
            name="Family Name"
          />
        </FormSection>

        <FormSection>
          <InputLabel>
            Colour Theme
          </InputLabel>
          <div style={{marginTop:'15px'}}>
            <CirclePicker
              // onChange={color => {
              //   props.setFieldValue("color", color.hex);
              // }}
              // color={props.values.color}
              width="100%"
            />
          </div>
        </FormSection>

        <FormSection>
          <InputLabel>
            Family Group Photo
          </InputLabel>
          <div style={{marginTop:'15px'}}>
            <StyledDropzone/>
          </div>
        </FormSection>

        <FormSection>
          <InputLabel>
            Members
          </InputLabel>
          <MembersList>
            {members.map(member => (
              <Member>
                {member.firstName} {member.lastName}
                <AdminTag>
                  Admin
                </AdminTag>
              </Member>
            ))}
          </MembersList>
        </FormSection>
    </Container>
  )
}
