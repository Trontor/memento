import React, { useState } from "react";
import { Formik } from "formik";
//import * as yup from "yup";
import {
  SettingsContainer,
  UploadPhoto,
  Calendar,
  CountryPicker,
  CityPicker
} from "./SettingsStyles";
import { AddButton } from "ui/Buttons";
import { FormSection, InputSection, InputLabel, InputField } from "ui/Forms";
import { useQuery } from "@apollo/react-hooks";
import GET_CURRENT_USER from "queries/GetCurrentUser";

export default function SettingsProfile({ menuClick }) {
  const { data } = useQuery(GET_CURRENT_USER);

  let defaultValues = {
    firstName: "",
    lastName: ""
  };

  //let changeLastName = <InputField type="text" />;

  if (data && data.currentUser) {
    /*changeFirstName = (
      <InputField type="text" value={data.currentUser.firstName} />
    );
    changeLastName = (
      <InputField type="text" value={data.currentUser.lastName} />
    );*/
    defaultValues.firstName = data.currentUser.firstName;
    defaultValues.lastName = data.currentUser.lastName;
  }

  //console.log(defaultValues);

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
    <Formik
      initialValues={defaultValues}
      /*validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}*/
      render={props => (
        <SettingsContainer menuClick={menuClick.profile}>
          <FormSection>
            <UploadPhoto type="file" id="file" />
            <AddButton text="Add a Profile Photo">
              <i className="fa fa-plus"></i>
            </AddButton>
          </FormSection>

          <InputSection>
            {/* First Name  */}
            <InputLabel>First Name</InputLabel>
            <InputField
              type="text"
              name="firstName"
              onChange={props.handleChange}
              value={props.values.firstName}
            />
          </InputSection>

          <InputSection>
            <InputLabel>Last Name</InputLabel>
            <InputField type="text" />
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
      )}
    />
  );
}
