import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginLayout = styled.div`
  height: 100%;
`;

export const Intro = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid grey;
  padding: 20px;
`;

export const LoginWrapper = styled.div`
  width: 400px;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TitleWrapper = styled.div`
  width: 250px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-bottom: 4px solid #ff996c;
  border-radius: 1px;
  text-align: center;
  letter-spacing: 1px;
`;

export const ErrorMsg = styled.div`
  width: 100%;
  margin-left: ${props => (props.attributes === "lastName" ? "27px" : "0")};
  margin-bottom: -16px;
  color: red;
`;

export const Message = styled.div`
  margin-top: 15px;
  letter-spacing: 0.5px;
`;

export const MsgLink = styled(Link)`
  color: #ff996c;
  text-decoration: none;
  font-weight: bold;
`;
