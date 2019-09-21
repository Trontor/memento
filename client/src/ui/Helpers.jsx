import styled, { css } from "styled-components";

// Used for centering elements within its parent
export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// Used across the site as a container for the main column
export const Container = styled.div`
  margin: 30px auto;
  position: relative;
  top: ${props => (props.noNav ? "0px" : "40px")};

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.mobile}) {
    margin: 30px 40px;
  }

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.tabletLandscape}) {
    top: 0;
    margin: 30px auto;
    width: 70%;
    max-width: 748px;
  }
`;

export const Wrapper = styled.div`
  margin: 20px;
  position: relative;
`

// Align elements to the right of the parent
export const AlignRight = styled.div`
  margin-left: auto;
  display: inline-block;
`;

export const CenterText = styled.div`
  text-align: center;
`;