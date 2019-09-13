import styled from "styled-components";
import { Next, Invite } from "ui/Buttons";
import { lighten } from "polished";

export const DashboardContainer = styled.div`
  top: 10%;

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) {
    display: grid;
    grid-template-columns: 22% 78%;
    height: 100%;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
  padding: 20px;
  color: ${props => props.theme.palette.text};

  h2 {
    margin-bottom: 25px;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletPortrait}) {
    width: 45%;
  }

  @media screen and (min-width: ${props =>
      props.theme.breakpoints.tabletLanscape}) {
    position: relative;
    width: 45%;
  }
`;

export const ButtonWrapper = styled.div`
  height: 75px;
  width: 100%;
  background: ${props => lighten(0.05, props.theme.palette.sidebar)};
  padding: 5px 0;
  display: grid;
  grid-template-areas: "orangeButton heading icon" "orangeButton text icon";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 70px auto 40px;
  text-align: left;
  margin-bottom: 10px;
  cursor: pointer;
  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 100px;
  }
`;

export const TextHeading = styled.h4`
  grid-area: heading;
  padding: 0;
  margin-top: 15px;
  margin-left: 5px;
  letter-spacing: 0.5px;
`;

export const TextDetail = styled.span`
  grid-area: text;
  font-size: 12px;
  margin-top: -25px;
  margin-left: 5px;
  padding: 0;
`;

export const NextButton = styled(Next)`
  grid-area: icon;
  padding-top: 12px;
`;

export const InviteFamily = styled(Invite)`
  color: ${props => props.theme.palette.main};
  margin-top: 10px;
  margin-left: 10px;
`;
