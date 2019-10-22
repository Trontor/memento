import { AdminTag, Member, MembersList } from "./FamilyGroupSettingsStyles";
import { BackButton, BackToView, SettingsHeader } from "ui/Navigation";
import { FormSection, InputLabel } from "ui/Forms";
import { LOAD_FAMILY, UPDATE_FAMILY } from "mutations/Family";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ButtonPrimary } from "ui/Buttons";
import { CirclePicker } from "react-color";
import { Container } from "ui/Helpers";
import EditInput from "components/EditInput/EditInput";
import { Formik } from "formik";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { StyledDropzone } from "components/FileDropzone/FileDropzone";
import { useHistory } from "react-router-dom";

export default function FamilyGroupSettings(props) {
  const history = useHistory();
  // Stores information about the current user, and the form values
  const [family, setFamily] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [changeImage, setChangeImage] = useState(false);
  const familyId = props.match.params.id;
  const { refetch, loading /* error */ } = useQuery(LOAD_FAMILY, {
    variables: { id: familyId },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      if (data.family) {
        setFamily(data.family);
      }
    },
  });

  const [updateFamily, updateFamilyStatus] = useMutation(UPDATE_FAMILY, {
    onCompleted: () => refetch(),
  });

  if (loading || !family || updateFamilyStatus.loading) {
    return <JollyLoader />;
  }

  // Colour Theme Selection for Family Group
  const colorSelection = [
    "#FF7F5F",
    "#FF3221",
    "#FF337D",
    "#EA40E0",
    "#9127D2",
    "#5627D2",
    "#274CE3",
    "#2883FF",
    "#0099BE",
    "#00C494",
    "#00BE4E",
    "#FFB700",
    "#F97908",
  ];

  /**
   * Handles the Formik form submit (when the 'Save Changes' button is pressed)
   * @param {any} values Formik values object
   */
  const handleFormSubmit = values => {
    const inputVariables = {
      familyId,
      name: values.familyName,
      colour: values.colour,
    };
    if (newImageFile) {
      inputVariables.image = newImageFile;
    }
    updateFamily({
      variables: {
        input: inputVariables,
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={{
        familyName: family.name,
        colour: family.colour,
      }}
      render={props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <Container>
              <SettingsHeader>
                <BackToView onClick={() => history.push("/family/" + familyId)}>
                  <BackButton />
                </BackToView>
                <Header center>Family Group Settings</Header>
                <div></div>
              </SettingsHeader>
              <FormSection>
                <EditInput
                  name="familyName"
                  value={props.values.familyName}
                  onChange={props.handleChange}
                  inputLabel="Family Name"
                />
              </FormSection>

              <FormSection>
                <InputLabel>Colour Theme</InputLabel>
                <div style={{ marginTop: "15px" }}>
                  <CirclePicker
                    data-cy="circle-picker"
                    onChange={color => {
                      props.setFieldValue("colour", color.hex);
                    }}
                    // color={props.values.color}
                    color={props.values.colour}
                    width="100%"
                    colors={colorSelection}
                  />
                </div>
              </FormSection>

              <FormSection>
                <InputLabel>Family Group Photo</InputLabel>
                {!changeImage ? (
                  <>
                    <img
                      alt={family.name}
                      src={family.imageUrl}
                      style={{ width: "100%" }}
                    />
                    <ButtonPrimary onClick={() => setChangeImage(true)}>
                      Change Image
                    </ButtonPrimary>
                  </>
                ) : (
                  <div style={{ marginTop: "15px" }}>
                    {newImageFile ? (
                      <div>
                        <img
                          alt={newImageFile.path}
                          style={{ width: "100%" }}
                          src={URL.createObjectURL(newImageFile)}
                        />
                        <button onClick={() => setNewImageFile(null)}>
                          Remove
                        </button>
                      </div>
                    ) : (
                      <StyledDropzone
                        onFilesAdded={files => setNewImageFile(files[0])}
                      />
                    )}
                    {family.imageUrl && (
                      <ButtonPrimary onClick={() => setChangeImage(false)}>
                        Cancel Change
                      </ButtonPrimary>
                    )}
                  </div>
                )}
              </FormSection>

              <FormSection>
                <InputLabel>Members</InputLabel>
                <MembersList>
                  {family.members.map(member => (
                    <Member key={member.firstName}>
                      {/*
                      {!member.imageUrl ? (
                        <i className="fas fa-user-circle"></i>
                      ) : (
                        <img src={member.imageUrl} alt={member.firstName} />
                      )}*/}
                      {member.firstName} {member.lastName}
                      {member.familyRoles.some(
                        r =>
                          r.familyId === familyId &&
                          r.familyRole.toLowerCase() === "admin",
                      ) && <AdminTag>Admin</AdminTag>}
                    </Member>
                  ))}
                </MembersList>
              </FormSection>
              {/* Save Changes Button  */}
              {props.dirty && (
                <ButtonPrimary
                  type="submit"
                  style={{ float: "right", marginBottom: "10px" }}
                >
                  Save Changes
                </ButtonPrimary>
              )}
            </Container>
          </form>
        );
      }}
    />
  );
}
