import React, { useState } from "react";

import { GET_DASHBOARD_INFORMATION } from "queries/Dashboard";
import JollyError from "components/JollyError/JollyError";
import JollyLoader from "components/JollyLoader/JollyLoader";
import MonthlyMementos from "./MonthlyMementos/MonthlyMementos";
import NewUser from "./NewUser/NewUser";
import { useQuery } from "@apollo/react-hooks";

const loadingQuotes = [
  "Dashboarding things...",
  "Talking to GraphQL...",
  "UwU",
  ">.< hold on!",
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { error, loading } = useQuery(GET_DASHBOARD_INFORMATION, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      if (data && data.currentUser) {
        setUser(data.currentUser);
      }
    },
  });

  // Handle the states of displaying data, error and loading
  if (error) {
    return <JollyError />;
  }
  if (loading || !user) {
    return <JollyLoader quotes={loadingQuotes} />;
  }
  const families = user.families;
  // Render families if exists
  if (families && families.length === 0) {
    return <NewUser user={user} />;
  }

  return <MonthlyMementos
    families={families}
    user={user}
  />;
}
