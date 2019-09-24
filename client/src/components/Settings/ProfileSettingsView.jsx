import { AddButton, ButtonPrimary } from "ui/Buttons";
import {
  Calendar,
  CityPicker,
  CountryPicker,
  PlaceWrapper,
  PlacesList,
  SettingsContainer,
  UploadLabel,
  UploadPhoto,
} from "./SettingsStyles";
import {
  FormSection,
  ImgPreview,
  InputField,
  InputLabel,
  InputSection,
  UserAvatar,
} from "ui/Forms";
import {
  RadioButton,
  RadioButtonStyle,
  RadioLabel,
  RadioOption,
} from "ui/Radio";
import React, { useState } from "react";

import { DeleteButton } from "components/Invite/InviteStyles";
import EditInput from "components/EditInput/EditInput";
import { Formik } from "formik";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "mutations/User";

export default function SettingsProfile() {
  const [file, setFile] = useState(null); //file for profile picture
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

  const { data, error /* loading */ } = useQuery(GET_CURRENT_USER);
  const [updateUser, updateUserResults] = useMutation(UPDATE_USER);
  let user = {};
  //Handle the states of displaying data, error and loading
  if (error) {
    console.log("Error loading user data:", error);
  }
  if (updateUserResults.data) {
    window.location.reload(true);
  }

  if (data && data.currentUser) {
    user = data.currentUser;
    console.log("Loaded:", user);
  }

  function imgHandleChange(event) {
    setFile(event.target.files[0]);
  }

  let ProfilePicture = <UserAvatar size="125px" />; //Profile picture preview
  if (file) {
    ProfilePicture = <img src={URL.createObjectURL(file)} alt="."></img>;
  } else if (user) {
    ProfilePicture = <img src={user.imageUrl} alt="."></img>;
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
      onSubmit={() => {
        const payload = {
          userId: user.userId,
          image: file,
        };
        console.log("Payload:", payload);

        updateUser({ variables: { input: payload } });
      }}
      initialValues={{ firstName: "Chicken", lastName: user.lastName }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
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

            <FormSection>
              {/* First Name */}
              <EditInput
                value={props.values.firstName}
                inputLabel="First Name"
                handleChange={props.handleChange}
                name="firstName"
              />
            </FormSection>

            <FormSection>
              {/* Last Name */}
              <EditInput
                value={props.values.lastName}
                inputLabel="Last Name"
                handleChange={props.handleChange}
                name="lastName"
              />
            </FormSection>

            <FormSection>
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
            </FormSection>

            <FormSection>
              {/* Gender */}
              <InputLabel>Gender</InputLabel>
              <InputSection>
                {genderList.map(gender => (
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
                ))}
              </InputSection>
            </FormSection>

            <FormSection>
              {/* Place of birth  */}
              <InputLabel>Place of Birth</InputLabel>
              <CountryPicker
                value={birthCountry}
                onChange={selectBirthCountry}
              />
              <CityPicker
                country={birthCountry}
                value={birthCity}
                onChange={selectBirthCity}
              />
            </FormSection>

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
            <ButtonPrimary
              type="submit"
              style={{ float: "right", margin: "10px" }}
            >
              Save Changes
            </ButtonPrimary>
          </SettingsContainer>
        </form>
      )}
    />
  );
}
