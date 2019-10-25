import styled from "styled-components";

export const Graph = styled.div`
  display: inline-grid;
  grid-template-areas:
    "empty months"
    "days squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;

  /* margin: 20px;
  padding: 20px; */
  /* border: 1px #e1e4e8 solid; */
  li {
    list-style: none;
  }
`;
export const Months = styled.ul`
  display: grid;
  grid-area: months;
  margin: 0px;
  padding: 0px;
  grid-template-columns: repeat(31, 20px); /* Jan */
  visibility: hidden;
  li {
    :nth-child(5n),
    :nth-child(1) {
      visibility: visible;
    }
  }
`;
export const Days = styled.ul`
  grid-area: days;
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(12, 15px);
  li {
    :nth-child(odd) {
      visibility: hidden;
    }
  }
`;
export const Squares = styled.ul`
  grid-area: squares;
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(12, 15px);
  padding: 0px;
  grid-auto-flow: column;
  grid-auto-columns: 15px;
  li {
    background-color: #ebedf0;
  }
`;
