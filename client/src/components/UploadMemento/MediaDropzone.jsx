import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { lighten } from "polished";
import { center } from "ui/Helpers";

const getColor = props => {
  if (props.isDragAccept) {
    return props => props.theme.palette.loading;
  }
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
  text-align: center;
  font-size: 16px;
  font-family: "Livvic", sans-serif;
  font-weight: 600;
  padding: 20px;
  border: 3px solid ${props => getColor(props)};
  border-radius: 4px;
  color: ${props => props.theme.palette.main};
  outline: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  margin-bottom: 6px;
  position: relative;

  &:hover {
    transition: 0.3s ease-in-out;

    i {
      color: ${props => props.theme.palette.main};
    }
  }
`;

const DropzoneContent = styled.div`
  width: 100%;
  ${center};

  i {
    display: block;
    font-size: 40px;
    color: ${props => lighten(0.1, props.theme.palette.main)};
    padding-bottom: 20px;
    transition: 0.2s ease-in-out;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;

  img {
    max-width: 50%;
    margin-bottom: 12px;
    display: block;
  }
`;

export function MediaDropzone({ onChange }) {
  const [mementoFiles, setMementoFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*,audio/*,video/*",
    onDrop: acceptedFiles => {
      setMementoFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const imagePreview = mementoFiles.map(file => (
    <img src={file.preview} alt={file.title} />
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      mementoFiles.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [mementoFiles],
  );

  useEffect(() => {
    if (onChange) onChange(mementoFiles);
  }, [mementoFiles]);

  return (
    <>
      <DropzoneContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <DropzoneContent>
          <i className="fas fa-upload"></i>
          Drag & drop or browse files to upload.
        </DropzoneContent>
      </DropzoneContainer>
      {mementoFiles.map(file => {
        console.log(file);
        return (
          <div>
            <span>{file.name}</span>
            <span
              onClick={() =>
                setMementoFiles(mementoFiles.filter(f => f != file))
              }
            >
              Remove
            </span>
          </div>
        );
      })}
      {/* <PreviewContainer>{imagePreview}</PreviewContainer> */}
    </>
  );
}
