import React, { useState } from "react";
import {
  SettingsContainer,
  UploadPhoto,
  UploadButton,
  UploadLabel,
  Calendar,
  CountryPicker,
  CityPicker
} from "./SettingsStyles";
import { FormSection, InputSection, InputLabel, InputField } from "ui/Forms";

export default function SettingsProfile({ menuClick, currentUser }) {
  const [birthday, setBirthday] = useState(null);
  const birthdayHandler = date => setBirthday(date);
  const genderList = ["Man", "Woman", "Other"];
  const [genderOption, setGenderOption] = useState();
  const genderOptionHandler = event => setGenderOption(event.target.value);
  const [birthCountry, setBirthCountry] = useState();
  const selectBirthCountry = value => setBirthCountry(value);
  const [birthCity, setBirthCity] = useState();
  const selectBirthCity = value => setBirthCity(value);

  return (
    <SettingsContainer menuClick={menuClick.profile}>
      <FormSection>
        <UploadPhoto type="file" id="file" />
        <UploadButton size="35px" />
        <UploadLabel htmlFor="file">Add a Profile Photo</UploadLabel>
      </FormSection>

      <InputSection>
        {/* First Name  */}
        <InputLabel>First Name</InputLabel>
        <InputField type="text" value={currentUser.firstName} />
      </InputSection>

      <InputSection>
        <InputLabel>Last Name</InputLabel>
        <InputField type="text" value={currentUser.lastName} />
      </InputSection>

      <InputSection>
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
      </InputSection>

      <FormSection>
        <InputLabel>Gender</InputLabel>
        {genderList.map(gender => (
          <InputSection>
            <input
              type="radio"
              value={gender}
              checked={genderOption === gender}
              onChange={genderOptionHandler}
            />
            {gender}
          </InputSection>
        ))}
      </FormSection>

      <InputSection>
        <InputLabel>Place of Birth</InputLabel>
        <CountryPicker value={birthCountry} onChange={selectBirthCountry} />
        <CityPicker
          country={birthCountry}
          value={birthCity}
          onChange={selectBirthCity}
        />
      </InputSection>
    </SettingsContainer>
  );
}
