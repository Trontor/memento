import { AddButton, ButtonPrimary } from "ui/Buttons";
import {
  Calendar,
  CityPicker,
  CountryPicker,
  ImgPreview,
  PlaceWrapper,
  PlacesList,
  SettingsContainer,
  UploadLabel,
  UploadPhoto,
  UserAvatar,
} from "./SettingsStyles";
import { FormSection, InputField, InputLabel, InputSection } from "ui/Forms";
import {
  RadioButton,
  RadioButtonStyle,
  RadioLabel,
  RadioOption,
} from "ui/Forms";
import React, { useState } from "react";

import { DeleteButton } from "components/Invite/InviteStyles";
import { Formik } from "formik";

export default function SettingsProfile() {
  let [file, setFile] = useState(null); //file for profile picture
  const [birthday, setBirthday] = useState(null); //birthday state
  const birthdayHandler = date => setBirthday(date);
  const genderList = ["Male", "Female", "Other"]; //gender list
  const [genderOption, setGenderOption] = useState(); //gender state
  const genderOptionHandler = event => setGenderOption(event.target.value);
  const [birthCountry, setBirthCountry] = useState(); //birth country state
  const selectBirthCountry = value => setBirthCountry(value);
  const [birthCity, setBirthCity] = useState(); //birth city state
  const selectBirthCity = value => setBirthCity(value);

  const [livePlaces, setLivePlaces] = useState([{ city: "", date: null }]); //place you've lived and date moved

  function imgHandleChange(event) {
    file = URL.createObjectURL(event.target.files[0]);
    setFile(file);
  }

  let ProfilePicture = <UserAvatar size="125px" />; //Profile picture preview
  if (file) {
    ProfilePicture = <img src={file} alt="."></img>;
  }

  function cityHandleChange(index, event) {
    //places you've lived onChange
    const places = [...livePlaces];
    places[index].city = event.target.value;
    setLivePlaces(places);
  }

  function dateHandleChange(index, value) {
    //date moved onChange
    const places = [...livePlaces];
    places[index].date = value;
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
    <Formik
      initialValues={{ firstName: "Jane", lastName: "Doe" }}
      render={props => (
        <SettingsContainer>
          <FormSection>
            <ImgPreview>{ProfilePicture}</ImgPreview>
            <UploadPhoto
              type="file"
              id="file"
              onChange={e => imgHandleChange(e)}
            />
            <UploadLabel htmlFor="file">Add a Profile Photo</UploadLabel>
          </FormSection>

          <InputSection>
            {/* First Name  */}
            <InputLabel>First Name</InputLabel>
            <InputField
              type="text"
              name="firstName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstName}
            />
          </InputSection>

          <InputSection>
            {/* Last Name  */}
            <InputLabel>Last Name</InputLabel>
            <InputField
              type="text"
              name="lastName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
            />
          </InputSection>

          <InputSection>
            {/* Birthday  */}
            <InputLabel>Birthday</InputLabel>
            <Calendar
              placeholderText="Click to select a date"
              selected={birthday}
              onChange={birthdayHandler}
              showMonthDropdown
              showYearDropdown
              isClearable
              dropdownMode="select"
              maxDate={new Date()}
            />
          </InputSection>

          <FormSection>
            {/* Gender */}
            <InputLabel>Gender</InputLabel>
            {genderList.map(gender => (
              <InputSection>
                <RadioOption>
                  <RadioButton
                    type="radio"
                    value={gender}
                    checked={genderOption === gender}
                    onChange={genderOptionHandler}
                  />
                  <RadioButtonStyle />
                  <RadioLabel>{gender}</RadioLabel>
                </RadioOption>
              </InputSection>
            ))}
          </FormSection>

          <InputSection>
            {/* Place of birth  */}
            <InputLabel>Place of Birth</InputLabel>
            <CountryPicker value={birthCountry} onChange={selectBirthCountry} />
            <CityPicker
              country={birthCountry}
              value={birthCity}
              onChange={selectBirthCity}
            />
          </InputSection>

          <PlaceWrapper>
            {/* Place You've Lived and Date Moved  */}
            <InputLabel>Places You've Lived</InputLabel>
            <InputLabel>Date Moved</InputLabel>
          </PlaceWrapper>
          <PlacesList>
            {livePlaces.map((place, idx) => (
              <PlaceWrapper>
                <InputField
                  type="text"
                  name="city"
                  placeholder="Select City"
                  style={{ width: "90%" }}
                  value={place.city}
                  onChange={e => cityHandleChange(idx, e)}
                />

                <Calendar
                  name="calendar"
                  placeholderText="Click to select a date"
                  selected={place.date}
                  onChange={date => dateHandleChange(idx, date)}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                />

                {livePlaces.length > 1 && (
                  <DeleteButton onClick={() => deletePlace(idx)}>
                    <i className="fa fa-trash"></i>
                  </DeleteButton>
                )}
              </PlaceWrapper>
            ))}
          </PlacesList>

          {livePlaces.length < 10 && (
            <AddButton
              text="Add another"
              onClick={() => addPlace({ city: "", date: null })}
            >
              <i className="fa fa-plus"></i>
            </AddButton>
          )}

          {/* Save Changes Button  */}
          <ButtonPrimary style={{ float: "right", margin: "10px" }}>
            Save Changes
          </ButtonPrimary>
        </SettingsContainer>
      )}
    />
  );
}
