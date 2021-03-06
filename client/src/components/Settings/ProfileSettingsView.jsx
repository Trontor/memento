import { AddButton, ButtonPrimary } from "ui/Buttons";
import {
  Calendar,
  RegionPicket,
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
} from "ui/Forms";
import {
  RadioButton,
  RadioButtonStyle,
  RadioLabel,
  RadioOption,
} from "ui/Radio";
import React, { useState, useEffect } from "react";
import { DeleteButton } from "components/Invite/InviteStyles";
import EditInput from "components/EditInput/EditInput";
import { Formik } from "formik";
import GET_CURRENT_USER from "queries/GetCurrentUser";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "mutations/User";
import JollyLoader from "components/JollyLoader/JollyLoader";
import imageCompression from "browser-image-compression";

const convertUserDataToFormValues = user => {
  // Extract 'country' and 'region' from the concatenated format
  let locationCountry, locationRegion;
  if (user.location) {
    locationCountry = user.location.split(",")[0].trim();
    locationRegion = user.location.split(",")[1].trim();
  }
  // Handle parsing of date of birth from ISO format
  let dateOfBirth;
  if (user.dateOfBirth) {
    dateOfBirth = new Date(Date.parse(user.dateOfBirth));
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    file: null,
    dateOfBirth,
    locationRegion,
    locationCountry,
    gender: user.gender,
    hometown: user.hometown,
    placesLived: user.placesLived.map(p => ({
      city: p.city,
      dateMoved: new Date(Date.parse(p.dateMoved)),
    })),
  };
};

export default function SettingsProfile() {
  // User data
  const [user, setUser] = useState(null);
  // Optimistic updating changes for file compression before mutation
  const [optimisticLoading, setOptimisticLoading] = useState(false);
  // List of possible genders (infinite)
  const genderList = ["Male", "Female", "Other"];
  // Stores information about the current user, and the form values
  let defaultFormValues = null;
  // Query to retrieve user settings, and mutation to update user settings
  const currentUserStatus = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      const user = data.currentUser;
      console.log("Loaded User Data:", user);
      setUser(user);
    },
  });
  const [updateUser, updateUserStatus] = useMutation(UPDATE_USER, {
    onError: error => {
      console.log("An error occured while updating the user:", error);
      setOptimisticLoading(false);
    },
    onCompleted: () => {
      setUser(null);
      setOptimisticLoading(false);
    },
  });
  useEffect(() => {
    if (!user) {
      console.log("Updated user data... refetching current user!");
      currentUserStatus.refetch();
    }
  }, [user, currentUserStatus]);

  // Loading state
  if (
    optimisticLoading ||
    currentUserStatus.loading ||
    updateUserStatus.loading ||
    !user
  ) {
    return <JollyLoader />;
  }
  defaultFormValues = convertUserDataToFormValues(user);

  //Handle the states of displaying data, error and loading
  if (currentUserStatus.error) {
    console.log("Error loading user data:", currentUserStatus.error);
  }
  console.log("current user status:", currentUserStatus);

  /**
   * Returns the most appropriate JSX element to represent the user's profile
   * picture.
   * @param {File} file A file, if exists.
   */
  const getProfilePicture = file => {
    if (file) {
      return <img src={URL.createObjectURL(file)} alt="."></img>;
    } else if (user.imageUrl) {
      return <img src={user.imageUrl} alt="."></img>;
    } else {
      return <i className="fas fa-user-circle" />;
    }
  };
  /**
   * Handles the Formik form submit (when the 'Save Changes' button is pressed)
   * @param {any} values Formik values object
   */
  const handleFormSubmit = async values => {
    setOptimisticLoading(true);
    // Concatenate location if both country and region values exist
    let location;
    if (values.locationCountry && values.locationRegion) {
      location = `${values.locationCountry.trim()}, ${values.locationRegion.trim()}`;
    }
    // Set up the basic payload
    let payload = {
      userId: user.userId,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      firstName: values.firstName,
      lastName: values.lastName,
      placesLived: values.placesLived,
      location,
      hometown: values.hometown,
    };
    // Only add the "image" attribute if a new file has been selected
    if (values.file) {
      payload["image"] = await imageCompression(values.file, {
        maxWidthOrHeight: 1200,
      });
    }
    console.log("Payload:", payload);
    updateUser({ variables: { input: payload } });
  };
  console.log("Rendering formik: ", defaultFormValues);

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={defaultFormValues}
      render={props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <SettingsContainer>
              <FormSection>
                <ImgPreview>{getProfilePicture(props.values.file)}</ImgPreview>
                <UploadPhoto
                  type="file"
                  id="file"
                  onChange={e => props.setFieldValue("file", e.target.files[0])}
                />
                <UploadLabel htmlFor="file">Add a Profile Photo</UploadLabel>
              </FormSection>

              <FormSection>
                {/* First Name */}
                <EditInput
                  name="firstName"
                  value={props.values.firstName}
                  inputLabel="First Name"
                  onChange={props.handleChange}
                  placeholder="Enter your first name"
                />
              </FormSection>

              <FormSection>
                {/* Last Name */}
                <EditInput
                  name="lastName"
                  value={props.values.lastName}
                  inputLabel="Last Name"
                  onChange={props.handleChange}
                  placeholder="Enter your last name"
                />
              </FormSection>

              <FormSection>
                {/* Date of Birth  */}
                <InputLabel>Date of Birth</InputLabel>
                <Calendar
                  name="dateOfBirth"
                  placeholderText="Click to select a date"
                  selected={props.values.dateOfBirth}
                  showMonthDropdown
                  showYearDropdown
                  isClearable
                  dateFormat="dd/MM/yyyy"
                  onChange={date => props.setFieldValue("dateOfBirth", date)}
                  dropdownMode="select"
                  maxDate={new Date()}
                />
              </FormSection>

              <FormSection>
                {/* Gender */}
                <InputLabel>Gender</InputLabel>
                <InputSection>
                  {genderList.map(gender => (
                    <RadioOption key={gender}>
                      <RadioButton
                        name="gender"
                        type="radio"
                        value={gender}
                        checked={
                          props.values.gender &&
                          props.values.gender.toLowerCase() ===
                            gender.toLowerCase()
                        }
                        onChange={props.handleChange}
                      />
                      <RadioButtonStyle />
                      <RadioLabel>{gender}</RadioLabel>
                    </RadioOption>
                  ))}
                </InputSection>
              </FormSection>

              <FormSection>
                <EditInput
                  name="hometown"
                  inputLabel="Hometown"
                  value={props.values.hometown}
                  onChange={props.handleChange}
                  placeholder="Enter your hometown"
                />
                {/* <InputField
                value={props.values.hometown}
                onChange={props.handleChange}
                placeholder="Enter your hometown"
              /> */}
              </FormSection>

              <FormSection>
                {/* Location */}
                <InputLabel>Location</InputLabel>
                <CountryPicker
                  name="locationCountry"
                  value={props.values.locationCountry}
                  onChange={country =>
                    props.setFieldValue("locationCountry", country)
                  }
                />
                <RegionPicket
                  name="locationRegion"
                  country={props.values.locationCountry}
                  value={props.values.locationRegion}
                  onChange={region =>
                    props.setFieldValue("locationRegion", region)
                  }
                />
              </FormSection>

              <PlaceWrapper>
                <InputLabel>Places You've Lived</InputLabel>
                <InputLabel>Date Moved</InputLabel>
              </PlaceWrapper>
              {
                <PlacesList>
                  {props.values.placesLived.map((place, idx) => {
                    return (
                      <PlaceWrapper>
                        <InputField
                          type="text"
                          name="city"
                          placeholder="Select City"
                          style={{ width: "85%" }}
                          value={place.city}
                          //insert onChange function here
                          onChange={e => {
                            const place = e.target.value;
                            const placesLivedCopy = [
                              ...props.values.placesLived,
                            ];
                            placesLivedCopy[idx].city = place;
                            props.setFieldValue("placesLived", placesLivedCopy);
                          }}
                        />
                        <Calendar
                          name="calendar"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Click to select a date"
                          selected={place.dateMoved}
                          onChange={date => {
                            console.log(date);
                            const placesLivedCopy = [
                              ...props.values.placesLived,
                            ];
                            placesLivedCopy[idx].dateMoved = date;
                            props.setFieldValue("placesLived", placesLivedCopy);
                          }}
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          maxDate={new Date()}
                        />

                        {props.values.placesLived.length > 1 && (
                          <DeleteButton
                            onClick={() => {
                              const placesLivedCopy = [
                                ...props.values.placesLived,
                              ];
                              placesLivedCopy.splice(idx, 1);
                              props.setFieldValue(
                                "placesLived",
                                placesLivedCopy,
                              );
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </DeleteButton>
                        )}
                      </PlaceWrapper>
                    );
                  })}
                </PlacesList>
              }
              {props.values.placesLived.length < 10 && (
                <AddButton
                  text="Add another"
                  onClick={() =>
                    props.setFieldValue("placesLived", [
                      ...props.values.placesLived,
                      { city: "", dateMoved: null },
                    ])
                  }
                >
                  <i className="fa fa-plus"></i>
                </AddButton>
              )}

              {/* Save Changes Button  */}
              {
                <ButtonPrimary
                  type="submit"
                  style={{ float: "right", margin: "10px" }}
                >
                  Save Changes
                </ButtonPrimary>
              }
            </SettingsContainer>
          </form>
        );
      }}
    />
  );
}
