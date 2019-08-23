import styled from "styled-components";
import { Button } from "ui/Forms";

export const Name = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
export const Email = styled.div``;
export const Password = styled.div``;
export const SignupContainer = styled.div``;
export const FirstName = styled.div`
  margin-right: 10px;
`;
export const LastName = styled.div`
  margin-left: 10px;
`;

export const SignupButton = styled(Button)`
  background: #ff996c;
  color: white;
  padding: 10px 30px;
`;

export const LoginButton = styled(Button)`
  float: right;
  background: white;
  color: #ff996c;
  margin-top: 25px;
  margin-right: 15px;
  padding: 10px 20px;
  border: 1px solid #ff996c;
`;
