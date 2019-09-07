import React, { useState } from "react";
import { Container } from "ui/Helpers";
import { Header } from "ui/Typography";
import {
  SettingsHeader,
  HeaderButton,
  SettingsContainer,
  UploadPhoto,
  UploadLabel,
  UploadButton,
  Calendar,
  CountryPicker,
  CityPicker
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel, FormInputList } from "ui/Forms";

export default function Settings() {
  const [settingsHeader, setSettingsHeader] = useState({
    profile: true,
    account: false
  });
  const settingsOpened = () =>
    setSettingsHeader({
      profile: !settingsHeader.profile,
      account: !settingsHeader.account
    });

  const [birthday, setBirthday] = useState(null);
  const dateOptionHandler = date => setBirthday(date);
  const [genderOption, setGenderOption] = useState();
  const genderOptionHandler = event => setGenderOption(event.target.value);
  const [birthCountry, setCountry, locationCountry] = useState();
  const selectCountry = value => setCountry(value);
  const [city, setCity] = useState();
  const selectCity = value => setCity(value);

  return (
    <Container>
      <Header underline>My Settings</Header>
      <SettingsHeader>
        <HeaderButton
          onClick={settingsOpened}
          menuClick={settingsHeader.profile}
        >
          Profile
        </HeaderButton>
        <HeaderButton
          onClick={settingsOpened}
          menuClick={settingsHeader.account}
        >
          Account
        </HeaderButton>
      </SettingsHeader>
      <SettingsContainer menuClick={settingsHeader.profile}>
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
          <Calendar
            placeholderText="Click to select a date"
            selected={birthday}
            onChange={dateOptionHandler}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
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
            Other: <InputField placeholder="Please specify your gender..." />
          </FormInputList>
        </FormSection>
        <FormSection>
          <InputLabel>Place of Birth</InputLabel>
          <CountryPicker value={birthCountry} onChange={selectCountry} />
          <CityPicker
            country={birthCountry}
            value={city}
            onChange={selectCity}
          />
        </FormSection>
        <FormSection>
          <InputLabel>Place You've Lived </InputLabel>
          <CountryPicker value={locationCountry} onChange={selectCountry} />
          <CityPicker
            country={locationCountry}
            value={city}
            onChange={selectCity}
          />
        </FormSection>
      </SettingsContainer>
    </Container>
  );
}
