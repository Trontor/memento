import React, { useState } from "react";

import { Container } from "ui/Helpers";
import { GET_MY_MEMENTOS } from "queries/Memento";
import NoViewMemento from "./NoViewMemento";
import ViewMementoCard from "./ViewMementoCard";
import { useQuery } from "@apollo/react-hooks";
import JollyLoader from "components/JollyLoader/JollyLoader";

// import { useQuery } from "@apollo/react-hooks";

export default function ViewMemento() {
  const [mementos, setMementos] = useState(null);

  useQuery(GET_MY_MEMENTOS, {
    onCompleted: data => {
      if (data && data.getMyUploadedMementos)
        setMementos(data.getMyUploadedMementos);
    },
  });
  console.log(mementos);
  if (!mementos) {
    return <JollyLoader />;
  }
  if (mementos.length === 0) {
    return <NoViewMemento />;
  }

  return (
    <Container>
      {mementos.map(memento => {
        return <ViewMementoCard {...memento} />;
      })}
    </Container>
  );
}
