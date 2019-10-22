// import { GET_MEMENTOS } from "queries/Memento";
import { MonthlyMementosWrapper } from "./MonthlyMementoStyles";
import React from "react";
import SmallCard from "./SmallCard";

// import { useQuery } from "@apollo/react-hooks";

export default function YearlyMementosViewer(props) {
  const { year, mementos } = props;
  console.log(year, mementos);
  if (!mementos) {
    return null;
  }
  return (
    <MonthlyMementosWrapper>
      {mementos.map(memento => (
        <SmallCard key={memento.mementoId} {...memento} />
      ))}
    </MonthlyMementosWrapper>
  );
}
