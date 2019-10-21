import React, { useState } from "react";

import { GET_MEMENTOS } from "queries/Memento";
import MementoCard from "components/MementoCard/MementoCard";
import { MonthlyMementosWrapper } from "./MonthlyMementoStyles";
import { useQuery } from "@apollo/react-hooks";

// const sameMonth = memento => {
//   const mementoDates = memento.dates;
//   const currentMonth = 10 || new Date().getMonth();
//   return mementoDates.some(date => date.month === currentMonth);
// };

// const sameDay = memento => {
//   const mementoDates = memento.dates;
//   const today = new Date().getDay();
//   return mementoDates.some(date => date.day === today);
// };

export default function YearlyMementosViewer(props) {
  const { year, mementos } = props;
  console.log(year, mementos);
  if (!mementos) {
    return null;
  }
  return (
    <MonthlyMementosWrapper>
      {mementos.map(memento => (
        <MementoCard key={memento.mementoId} {...memento} />
      ))}
    </MonthlyMementosWrapper>
  );
}
