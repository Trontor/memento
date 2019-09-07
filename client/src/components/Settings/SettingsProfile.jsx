import React, { useState } from "react";
import {
  SettingsContainer,
  UploadPhoto,
  UploadLabel,
  UploadButton,
  Calendar,
  CountryPicker,
  CityPicker,
  PlaceWrapper
} from "./SettingsStyles";
import { InputField, FormSection, InputLabel, FormInputList } from "ui/Forms";

export default function SettingsProfile({ menuClick }) {
  const [birthday, setBirthday] = useState(null);
  const birthdayHandler = date => setBirthday(date);
  const [moveDate, setMoveDate] = useState(null);
  const moveHandler = date => setMoveDate(date);
  const [genderOption, setGenderOption] = useState();
  const genderOptionHandler = event => setGenderOption(event.target.value);
  const [birthCountry, setCountry] = useState();
  const selectCountry = value => setCountry(value);
  const [locationCountry, setLocationCountry] = useState();
  const selectLocationCountry = value => setLocationCountry(value);
  const [city, setCity] = useState();
  const selectCity = value => setCity(value);
  const [locationCity, setLocationCity] = useState();
  const selectLocationCity = value => setLocationCity(value);

  return (
    <SettingsContainer menuClick={menuClick.profile}>
      <FormSection>
        <UploadPhoto type="file" id="file" />
        <UploadButton size="35px" />
        <UploadLabel htmlFor="file">Add a Profile Photo</UploadLabel>
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
          onChange={birthdayHandler}
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
        <CityPicker country={birthCountry} value={city} onChange={selectCity} />
      </FormSection>
      <PlaceWrapper>
        <FormSection>
          <InputLabel>Place You've Lived </InputLabel>
          <CountryPicker
            value={locationCountry}
            onChange={selectLocationCountry}
          />
          <CityPicker
            country={locationCountry}
            value={locationCity}
            onChange={selectLocationCity}
          />
        </FormSection>
        <FormSection>
          <InputLabel>Date moved</InputLabel>
          <Calendar
            placeholderText="Click to select a date"
            selected={moveDate}
            onChange={moveHandler}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />
        </FormSection>
      </PlaceWrapper>
    </SettingsContainer>
  );
}
