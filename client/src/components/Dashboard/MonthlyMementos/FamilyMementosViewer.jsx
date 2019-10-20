import React, { useState } from "react";

import { Container } from "ui/Helpers";
import { GET_MEMENTOS } from "queries/Memento";
import MementoCard from "components/MementoCard/MementoCard";
import { MonthlyMementosWrapper } from "./MonthlyMementoStyles";
import { useQuery } from "@apollo/react-hooks";

const sameMonth = memento => {
  const mementoDates = memento.dates;
  const currentMonth = 2 || new Date().getMonth();
  return mementoDates.some(date => date.month === currentMonth);
};

// const sameYear = memento => {
//   const mementoDates = memento.dates;
//   const currentYear = new Date().getYear();
//   return mementoDates.some(date => date.year === currentYear);
// };

export default function FamilyMementosViewer(props) {
  const { familyId } = props;
  const [mementos, setMementos] = useState(null);
  // Load family mementos
  useQuery(GET_MEMENTOS, {
    variables: { id: familyId },
    onCompleted: data => {
      if (data && data.mementos) {
        console.log(data);

        setMementos(data.mementos);
      }
    },
  });
  if (!mementos) {
    return null;
  }
  // Filter mementos by the same year
  const filteredMementos = mementos.filter(sameMonth);
  return (
    <MonthlyMementosWrapper>
      {filteredMementos.map(memento => (
        <MementoCard {...memento} />
      ))}
    </MonthlyMementosWrapper>
  );
}
