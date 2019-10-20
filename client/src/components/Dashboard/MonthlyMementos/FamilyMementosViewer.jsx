import React, { useState } from "react";

import { GET_MEMENTOS } from "queries/Memento";
import MementoCard from "components/MementoCard/MementoCard";
import { MonthlyMementosWrapper } from "./MonthlyMementoStyles";
import { useQuery } from "@apollo/react-hooks";

const sameMonth = memento => {
  const mementoDates = memento.dates;
  const currentMonth = 10 || new Date().getMonth();
  return mementoDates.some(date => date.month === currentMonth);
};

const sameDay = memento => {
  const mementoDates = memento.dates;
  const today = new Date().getDay();
  return mementoDates.some(date => date.day === today);
};

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
  // Filter mementos by the same month
  const filteredMementos = mementos.filter(sameMonth);
  const todayMementos = mementos.filter(sameDay)

  return (
    <MonthlyMementosWrapper>
      {filteredMementos.map(memento => (
        <MementoCard
          key={memento.mementoId}
          {...memento} />
      ))}
    </MonthlyMementosWrapper>
  );
}
