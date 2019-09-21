import { AdminTag, Member, MembersList } from "./FamilyGroupSettingsStyles";
import { ButtonSecondary, CancelButton, EditButton } from "ui/Buttons";
import { CenterText, Container } from "ui/Helpers";
import {
  DefaultInput,
  EditInput,
  FormSection,
  InputField,
  InputLabel
} from "ui/Forms";
import React, { useState } from 'react'

import { CirclePicker } from "react-color";
import EditForm from "components/EditInput/EditInput";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { LOAD_FAMILY } from "mutations/Family";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroupSettings(props) {
  const familyId = props.match.params.id;
  const [toggleEdit, setToggleEdit] = useState(false);
  const { data, loading, error } = useQuery(LOAD_FAMILY, {
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

  let defaultValue = <DefaultInput>{familyName}</DefaultInput>;
  if (toggleEdit) {
    defaultValue = (
      <InputField type="text" name="familyName" value={familyName}/>
    );
  }

  return (
    <Container>
      <CenterText>
        <Header center>Family Group Settings</Header>
      </CenterText>
        <FormSection>
          <EditForm/>
        </FormSection>
        <FormSection>
          <EditInput>
            <div>
              <InputLabel>
                Family Name
              </InputLabel>
              {defaultValue}
            </div>
            {!toggleEdit ? (
              <EditButton size="25px" onClick={() => setToggleEdit(!toggleEdit)}/>
            ):
              <CancelButton size="25px" onClick={() => setToggleEdit(!toggleEdit)}/>
            }
          </EditInput>
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
