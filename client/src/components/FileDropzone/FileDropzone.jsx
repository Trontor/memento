import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { lighten } from "polished";

const getColor = props => {
  // if (props.isDragAccept) {
  //   return props => lighten(0.1, props.theme.palette.loading);
  // }
  if (props.isDragReject) {
    return props => props.theme.palette.error;
  }
  if (props.isDragActive) {
    return props => props.theme.palette.main;
  }
  return "#eee";
};

const DropzoneContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  font-family: "Livvic", sans-serif;
  font-weight: 600;
  padding: 20px;
  border: 3px solid ${props => getColor(props)};
  border-radius: 4px;
  color: ${props => lighten(0.4, props.theme.palette.text)};
  outline: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  margin-bottom: 6px;

  &:hover {
    color: ${props => lighten(0.3, props.theme.palette.text)};
    transition: 0.3s ease-in-out;
  }

  p {
    line-height: 1.5em;
  }
`;

export function StyledDropzone({ onFilesAdded }) {
  const onDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      if (onFilesAdded) onFilesAdded(acceptedFiles);
    },
    [onFilesAdded],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });
  return (
    <DropzoneContainer
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your image here ...</p>
      ) : (
        <p>Drag a file here or click to upload.</p>
      )}
    </DropzoneContainer>
  );
}
