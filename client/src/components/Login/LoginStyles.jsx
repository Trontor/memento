import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletPortrait}) {
    width: 450px;
  }
`;

export const MsgLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
`;