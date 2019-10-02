import styled from "styled-components";

export const MementoCardColumns = styled.div`
  display: grid;

  @media screen and (min-width: ${props =>
  props.theme.breakpoints.desktop}) {
    /* grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px; */
  }
`