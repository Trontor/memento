import React from "react";
import { UploadButton, NoMementosIcon } from "./FamilyGroupStyles";
import styled from "styled-components";

// Please feel free to refactor this if equivalent styles are in the ui/ folder
const NoMementoContainer = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
`;

const Center = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.palette.foreground};
  margin: auto;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 20px;
  height: 300px; /*requires explicit height*/
`;

/**
 *
 *  Rendered when the FamilyGroup has no mementos.
 *  Takes in 1 prop, onClick, to be fired when 'add a memento' is clicked.
 * @author Rohyl Joshi
 */
export default function NoMementos(props) {
  const { onClick, familyColour } = props;
  console.log(props);

  return (
    <NoMementoContainer>
      <Center>
        <NoMementosIcon />
        <h2>There's no mementos yet</h2>
        <p>You can upload mementos by clicking below:</p>
        <UploadButton
          familyColour={familyColour}
          style={{ marginTop: "10px" }}
          onClick={onClick}
        >
          <i class="fas fa-feather-alt"></i>
          <span>Add a Memento</span>
        </UploadButton>
      </Center>
    </NoMementoContainer>
  );
}
