import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;

  @media screen and (min-width: ${props => props.theme.breakpoints.tabletPortrait}){
    width: 450px;
  }

`;

export const ErrorMsg = styled.div`
  width: 100%;
  margin-left: ${props => (props.attributes === "lastName" ? "27px" : "0")};
  margin-bottom: -16px;
  color: 1px solid ${props => props.theme.palette.border};
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
