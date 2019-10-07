import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { GET_MEMENTOS } from "queries/Memento";
import { GET_USER_FAMILIES } from "queries/UserQueries";
import { TextList } from "../Sidebar/SidebarStyles";

export default function MementosViewer(props) {
  const [families, setFamilies] = useState(null);

  const { data } = useQuery(GET_USER_FAMILIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      setFamilies(data.currentUser.families);
    },
  });

  return (
    <div>
      {!families ? (
        <JollyLoader />
      ) : (
        families.map(family => (
          <TextList key={family.familyId}>
            <a href={`/family/${family.familyId}`}>{family.name}</a>
          </TextList>
        ))
      )}
    </div>
  );
}
