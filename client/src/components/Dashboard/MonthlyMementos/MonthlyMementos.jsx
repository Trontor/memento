import { DashboardContainer, DashboardNotifier } from "./MonthlyMementoStyles";

import FamilyMementosViewer from "./FamilyMementosViewer";
import { Header } from "ui/Typography";
import React from "react";
import moment from "moment";

export default function MonthlyMementos(props) {
  const { families } = props;

  // Convert current month integer to month name
  const currentMonth = moment.months(new Date().getMonth());

  console.log(families);

  // Load
  return (
    <DashboardContainer>
      <DashboardNotifier>
        Hi {props.user.firstName}!
        <p>
          Now that you have joined a famly group, allow us to introduce{" "}
          <span>Monthly Mementos</span>!
        </p>
        <p>
          <span>Monthly Mementos</span> displays all the mementos from each of
          your Family Groups that is dated with the current month from any year
          in history.
        </p>
      </DashboardNotifier>
      <Header underline>{currentMonth} Mementos</Header>
      {families.map(family => (
        <>
          <h2>{family.name}</h2>
          <FamilyMementosViewer familyId={family.familyId} />
        </>
      ))}
    </DashboardContainer>
  );
}
