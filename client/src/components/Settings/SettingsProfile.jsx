import React, { useState } from "react";
import {
  SettingsContainer,
  UploadPhoto,
  UploadButton,
  UploadLabel,
  Calendar,
  CountryPicker,
  CityPicker,
  PlaceWrapper,
  PlacesList
} from "./SettingsStyles";
import { FormSection, InputSection, InputLabel, InputField } from "ui/Forms";
import { DeleteButton } from "components/Invite/InviteStyles";
import { ButtonPrimary, AddButton } from "ui/Buttons";

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
  const [locationCountry, setLocationCountry] = useState();
  const selectLocationCountry = value => setLocationCountry(value);
  const [locationCity, setLocationCity] = useState();
  const selectLocationCity = value => setLocationCity(value);

  const [livePlaces, setLivePlaces] = useState([{ place: "", date: null }]);

  function handleChange(index, event) {
    const places = [...livePlaces];
    places[index].place = event.target.value;
    setLivePlaces(places);
  }

  const addPlace = place => {
    setLivePlaces([...livePlaces, place]);
  };

  const deletePlace = index => {
    const place = [...livePlaces];
    place.splice(index, 1);
    setLivePlaces(place);
  };

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

      <PlaceWrapper>
        <InputLabel>Places You've Lived</InputLabel>
        <InputLabel>Date Moved</InputLabel>
      </PlaceWrapper>
      <PlacesList>
        {livePlaces.map((place, idx) => (
          <PlaceWrapper>
            <InputField
              type="text"
              placeholder="Select City"
              style={{ width: "90%" }}
              value={place.place}
              onChange={e => handleChange(idx, e)}
            />

            <Calendar
              placeholderText="Click to select a date"
              selected={place.date}
              onChange={e => handleChange(idx, e)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              maxDate={new Date()}
            />

            {livePlaces.length > 1 && (
              <DeleteButton onClick={() => deletePlace(idx)}>
                <i class="fa fa-trash"></i>
              </DeleteButton>
            )}
          </PlaceWrapper>
        ))}
      </PlacesList>

      {livePlaces.length < 10 && (
        <AddButton text="Add another" onClick={() => addPlace({ place: "" })}>
          <i class="fa fa-plus"></i>
        </AddButton>
      )}

      {/*<InputSection>
          <InputLabel>Places You've Lived</InputLabel>
          <CountryPicker
            value={locationCountry}
            onChange={selectLocationCountry}
          />
          <CityPicker
            country={locationCountry}
            value={locationCity}
            onChange={selectLocationCity}
          />
        </InputSection>
        <InputSection>
          <InputLabel>Date Moved</InputLabel>
          <Calendar placeholderText="Click to select a date" />
        </InputSection>*/}
      <ButtonPrimary style={{ float: "right", margin: "10px" }}>
        Save Changes
      </ButtonPrimary>
    </SettingsContainer>
  );
}
