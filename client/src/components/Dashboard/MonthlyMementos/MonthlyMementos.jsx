import { DashboardContainer, DashboardNotifier } from "./MonthlyMementoStyles";

import FamilyMementosViewer from "./FamilyMementosViewer";
import { Header } from "ui/Typography";
import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import { GET_MONTHLY_MEMENTOS } from "queries/Dashboard";
import JollyLoader from "components/JollyLoader/JollyLoader";
import YearlyMementosViewer from "./YearlyMementosViewer";

const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export default function MonthlyMementos(props) {
  const [mementos, setMementos] = useState(null);
  const { families } = props;
  // Convert current month integer to month name
  const currentMonth = moment.months(new Date().getMonth());

  useQuery(GET_MONTHLY_MEMENTOS, {
    onCompleted: data => {
      if (data && data.allMyMementosThisMonth) {
        setMementos(data.allMyMementosThisMonth);
      }
    },
  });

  if (!mementos) {
    return <JollyLoader />;
  }
  const yearGroupsMap = groupBy(mementos, memento => memento.dates[0].year);
  const yearGroups = Array.from(yearGroupsMap, ([key, value]) => ({
    key,
    value,
  }));
  console.log(yearGroups);

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
      {yearGroups.map(group => (
        <>
          <h2>{group.key}</h2>
          <YearlyMementosViewer year={group.key} mementos={group.value} />
        </>
      ))}
      {/* {families.map(family => (
        <>
          <h2>{family.name}</h2>
          <FamilyMementosViewer familyId={family.familyId} />
        </>
      ))} */}
    </DashboardContainer>
  );
}
