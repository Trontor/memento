import styled from "styled-components";

export const FormInput = styled.input`
  width: 100%;
  padding: 6px;
  border: 1px solid lightgrey;
  display: block;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Form = styled.form`
  color: #493d57;
  display: grid;
  grid-template-rows: repeat(6, 20%);
  position: relative;
  float: right;
  width: 45%;
  height: 500px;

  padding: 50px 30px 0;
  font-size: 8pt;
  margin: 75px 0px;
`;

export const Title = styled.div`
  letter-spacing: 1px;
  border-bottom: 4px solid #ff996c;
  border-radius: 1px;
  margin-bottom: 30px;
  width: 100%;
  font-size: 10pt;
`;

export const InputLabel = styled.label``;
export const Input = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 12pt;
`;

export const Button = styled.button`
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.span`
  color: red;
`;
