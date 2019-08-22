import styled from "styled-components";

export const FormInput = styled.input`
  width: ${props =>
    props.attributes === "lastName" || props.attributes === "firstName"
      ? "89%"
      : "100%"};
  padding: 10px;
  border: none;
  border-bottom: ${props =>
    props.valid ? "1px solid red" : "2px solid lightgray"};
  display: block;
  margin-bottom: 0;
  margin-top: 50px;
  margin-left: ${props => (props.attributes === "lastName" ? "27px" : "0")};
  font-size: 14px;
  color: ${props => props.theme.palette.text};
`;
