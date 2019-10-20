import { DashboardContainer } from "./MonthlyMementoStyles";
import FamilyMementosViewer from "./FamilyMementosViewer";
import { Header } from "ui/Typography";
import React from "react";
import moment from "moment";

export default function MonthlyMementos(props) {
  const { families } = props;

  // Convert current month integer to month name
  const currentMonth = moment.months(new Date().getMonth());

  console.log(families)

  // Load
  return (
    <DashboardContainer>
      <Header underline>{currentMonth} Mementos</Header>
      {families.map(family => (
        <>
          {family.name}
          <FamilyMementosViewer familyId={family.familyId} />
        </>
      ))}
    </DashboardContainer>
  );
}
