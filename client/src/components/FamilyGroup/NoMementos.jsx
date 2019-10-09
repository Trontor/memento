import React from "react";
import { UploadButton } from "./FamilyGroupStyles";
import styled from "styled-components";

// Please feel free to refactor this if equivalent styles are in the ui/ folder
const NoMementoContainer = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
`;

const Center = styled.div`
  font-size: 32px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  margin: auto;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 20px;
  height: 220px; /*requires explicit height*/
`;

const FLUSHED_FACE_URL =
  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/whatsapp/224/flushed-face_1f633.png";
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
        no mementos...yet
        <br />
        ...unless? <br />
        <img src={FLUSHED_FACE_URL} height="40px" alt="flushed emoji" />
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
