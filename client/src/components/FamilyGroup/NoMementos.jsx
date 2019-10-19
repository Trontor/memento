import { NoMementosIcon, UploadButton } from "./FamilyGroupStyles";

import React from "react";
import styled from "styled-components";
import {transparentize} from "polished";

// Please feel free to refactor this if equivalent styles are in the ui/ folder
const NoMementoContainer = styled.div`
  position: relative;
  text-align: center;
  height: 100%;
`;

const Center = styled.div`
  margin: auto;
  border-radius: 5px;
  padding: 20px;
  height: 100%; /*requires explicit height*/

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletLandscape}) {
    background: ${props => props.theme.palette.foreground};
    border: 1px solid ${props => transparentize(0.93, props.theme.palette.text)};
    display: flex;
    align-items: center;
    > div {
      width: 100%;
    }
  }
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
    <NoMementoContainer data-cy="no-mementos">
      <Center>
        <div>
          <NoMementosIcon familyColour={familyColour} />
          <h2>No mementos have been added yet...</h2>
          <UploadButton
            familyColour={familyColour}
            style={{ marginTop: "10px" }}
            onClick={onClick}
          >
            <i className="fas fa-feather-alt"></i>
            <span>Add a Memento</span>
          </UploadButton>
        </div>
      </Center>
    </NoMementoContainer>
  );
}
