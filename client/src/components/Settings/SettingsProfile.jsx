import React, { useState } from "react";
import { Formik } from "formik";
import {
  SettingsContainer,
  UploadPhoto,
  UploadButton,
  UploadLabel,
  Calendar,
  CountryPicker,
  CityPicker,
  PlaceWrapper,
  PlacesList,
  ImgPreview,
  UserAvatar
} from "./SettingsStyles";
import { ButtonPrimary, AddButton } from "ui/Buttons";
import { DeleteButton } from "components/Invite/InviteStyles";

import { FormSection, InputSection, InputLabel, InputField } from "ui/Forms";
//import { useQuery } from "@apollo/react-hooks";
//import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function SettingsProfile({ menuClick }) {
  //const { data } = useQuery(GET_CURRENT_USER);

  /*let defaultValues = {
    firstName: "",
    lastName: ""
  };

  if (data && data.currentUser) {
    defaultValues.firstName = data.currentUser.firstName;
    defaultValues.lastName = data.currentUser.lastName;
  }*/
  let [file, setFile] = useState(null);

  const [birthday, setBirthday] = useState(null);
  const birthdayHandler = date => setBirthday(date);
  const genderList = ["Man", "Woman", "Other"];
  const [genderOption, setGenderOption] = useState();
  const genderOptionHandler = event => setGenderOption(event.target.value);
  const [birthCountry, setBirthCountry] = useState();
  const selectBirthCountry = value => setBirthCountry(value);
  const [birthCity, setBirthCity] = useState();
  const selectBirthCity = value => setBirthCity(value);

  const [livePlaces, setLivePlaces] = useState([{ city: "", date: null }]);

  function imgHandleChange(event) {
    file = URL.createObjectURL(event.target.files[0]);
    setFile(file);
  }

  let ProfilePicture = <UserAvatar size="125px" />;
  if (file) {
    ProfilePicture = <img src={file} alt="."></img>;
  }

  function cityHandleChange(index, event) {
    const places = [...livePlaces];
    places[index].city = event.target.value;
    setLivePlaces(places);
  }

  function dateHandleChange(index, value) {
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
        <SettingsContainer menuClick={menuClick.profile}>
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
          <ButtonPrimary style={{ float: "right", margin: "10px" }}>
            Save Changes
          </ButtonPrimary>
        </SettingsContainer>
      )}
    />
  );
}
