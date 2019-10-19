import React from "react";
import { MonthlyMementosContainer } from "./MonthlyMementoStyles";
import FamilyMementosViewer from "./FamilyMementosViewer";

export default function MonthlyMementos(props) {
  const { familyIds } = props;
  // Load
  return (
    <MonthlyMementosContainer>
      {familyIds.map(id => (
        <FamilyMementosViewer familyId={id} />
      ))}
    </MonthlyMementosContainer>
  );
}
