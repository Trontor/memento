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
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { Header } from "ui/Typography";
import { SettingsWrapper } from "./FamilyGroupSettingsStyles";
import { useQuery } from "@apollo/react-hooks";

export default function FamilyGroupSettings(props) {
  const familyId = props.match.params.id;
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const  [toggleEdit, setToggleEdit] = useState(false);

  let user = {};

  if (error) {
    console.log("Error loading user data:", error);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
  }


  let defaultValue = <DefaultInput>Value</DefaultInput>;
  if (toggleEdit) {
    defaultValue = (
      <InputField type="text" name="firstName" value={user.firstName} />
    );
  }

  return (
    <Container>
      <CenterText>
        <Header center>Family Group Settings</Header>
      </CenterText>
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
            Members
          </InputLabel>
        </FormSection>
    </Container>
  )
}
