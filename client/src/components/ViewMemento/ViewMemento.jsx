import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { GET_MEMENTOS } from "queries/Memento";
import { GET_USER_FAMILIES } from "queries/UserQueries";
import { TextList } from "../Sidebar/SidebarStyles";

export default function MementosViewer() {
  const [families, setFamilies] = useState([]);
  const [mementos, setMementos] = useState([]);

  const { familyList } = useQuery(GET_USER_FAMILIES, {
    onCompleted: familyList => {
      setFamilies(familyList.currentUser.families);
    },
  });
  console.log(families);

  /*const loadMemento = useQuery(GET_MEMENTOS, {
    variables: {
      id: //insert familyId here
    },
    onCompleted: data => {
      if (data && data.mementos) setMementos(data.mementos);
      console.log(data);
    },
  });*/

  return (
    <div>
      {!families ? (
        <JollyLoader />
      ) : (
        families.map(family => <div>{family.familyId}</div>)
      )}
    </div>
  );
}
