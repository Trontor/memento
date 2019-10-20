import { DashboardContainer } from "./MonthlyMementoStyles";
import FamilyMementosViewer from "./FamilyMementosViewer";
import { Header } from "ui/Typography";
import React from "react";
import moment from "moment";

export default function MonthlyMementos(props) {
  const { familyIds } = props;

  // Convert current month integer to month name
  const currentMonth = moment.months(new Date().getMonth());

  // Load
  return (
    <DashboardContainer>
      <Header underline>{currentMonth} Mementos</Header>
      {familyIds.map(id => (
        <FamilyMementosViewer familyId={id} />
      ))}
    </DashboardContainer>
  );
}
