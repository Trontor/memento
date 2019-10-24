import { DashboardContainer, DashboardNotifier } from "./MonthlyMementoStyles";
import React, { useState } from "react";

import { GET_MONTHLY_MEMENTOS } from "queries/Dashboard";
// import FamilyMementosViewer from "./FamilyMementosViewer";
import { Header } from "ui/Typography";
import JollyLoader from "components/JollyLoader/JollyLoader";
import NoMonthliesYet from "./NoMonthliesYet";
import YearlyMementosViewer from "./YearlyMementosViewer";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";

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
  // const { families } = props;
  // Convert current month integer to month name
  const currentMonth = moment.months(new Date().getMonth());

  useQuery(GET_MONTHLY_MEMENTOS, {
    fetchPolicy: "cache-and-network",
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
        <h2>Hi {props.user.firstName}!</h2>
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
      {yearGroups ? (
        <>
          <Header underline>{currentMonth} Mementos</Header>
          {yearGroups.map(group => (
            <>
              <h2>{group.key}</h2>
              <YearlyMementosViewer year={group.key} mementos={group.value} />
            </>
          ))}
        </>
      ) : (
        <NoMonthliesYet currentMonth={currentMonth} />
      )}
    </DashboardContainer>
  );
}
