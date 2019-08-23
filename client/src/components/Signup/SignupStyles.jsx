import styled from "styled-components";

export const SignupLayout = styled.div`
  height: 100%;
  display: block;

  @media screen and (max-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) {
    display: none;
  }
`;

export const Intro = styled.div`
  float: right;
  margin-top: 25px;
  margin-right: 15px;
  margin-left: auto;
`;

export const TitleWrapper = styled.div`
  width: 230px;
  position: absolute;
  top: 20%;
  left: 64%;
  transform: translate(-50%, -50%);
  border-bottom: 4px solid #ff996c;
  border-radius: 1px;
  text-align: left;
  letter-spacing: 1px;
`;

export const SignupWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: absolute;
  top: 53%;
  left: 74%;
  transform: translate(-50%, -50%);
`;

export const NameWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ErrorMsg = styled.div`
  width: 100%;
  margin-left: ${props => (props.attributes === "lastName" ? "27px" : "0")};
  margin-bottom: -16px;
  color: red;
`;
