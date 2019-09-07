import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import {
  SettingsHeader,
  HeaderButton,
  SettingsContainer,
  UploadPhoto,
  UploadLabel,
  UploadButton
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel, FormInputList } from "ui/Forms";
import { StyledDropzone } from "components/FileDropzone";

export default function Settings() {
  const [birthday, setBirthday] = useState(new Date());
  const [isProfileOpen, setProfileOpened] = useState(true);
  const profileOpened = () => setProfileOpened(!isProfileOpen);
  const [genderOption, setGenderOption] = useState();
  const genderOptionHandler = event => setGenderOption(event.target.value);

  return (
    <Container>
      <Header underline>My Settings</Header>
      <SettingsHeader>
        <HeaderButton onClick={profileOpened} menuClick={isProfileOpen}>
          Profile
        </HeaderButton>
        <HeaderButton>Account</HeaderButton>
      </SettingsHeader>
      <SettingsContainer menuClick={isProfileOpen}>
        <FormSection>
          <UploadPhoto type="file" id="file" />
          <UploadButton size="35px" />
          <UploadLabel for="file">Add a Profile Photo</UploadLabel>
        </FormSection>
        <FormSection>
          <InputLabel>First Name</InputLabel>
          <InputField placeholder="First Name..."></InputField>
        </FormSection>
        <FormSection>
          <InputLabel>Last Name</InputLabel>
          <InputField placeholder="Last Name..."></InputField>
        </FormSection>
        <FormSection>
          <InputLabel>Birthday</InputLabel>
          <DatePicker
            selected={birthday}
            onChange={date => setBirthday(date)}
            showMonthDropdown
            dropdownMode="select"
          />
        </FormSection>
        <FormSection>
          <InputLabel> Gender </InputLabel>
          <FormInputList>
            <input
              type="radio"
              value="man"
              checked={genderOption === "man"}
              onChange={genderOptionHandler}
            />
            Man
          </FormInputList>
          <FormInputList>
            <input
              type="radio"
              value="woman"
              checked={genderOption === "woman"}
              onChange={genderOptionHandler}
            />
            Woman
          </FormInputList>
          <FormInputList>
            <input
              type="radio"
              value="other"
              checked={genderOption === "other"}
              onChange={genderOptionHandler}
            />{" "}
            Other: <InputField style={{ width: "100px", margin: "0" }} />
          </FormInputList>
        </FormSection>
        <FormSection>
          <InputLabel>Place of Birth</InputLabel>
        </FormSection>
      </SettingsContainer>
    </Container>
  );
}
