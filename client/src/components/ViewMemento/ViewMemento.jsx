import React, { useState } from "react";

import { Container } from "ui/Helpers";
import { useQuery } from "@apollo/react-hooks";
import { GET_MY_MEMENTOS } from "queries/Memento";
import ViewMementoCard from "./ViewMementoCard";
import NoViewMemento from "./NoViewMemento";

// import { useQuery } from "@apollo/react-hooks";

export default function ViewMemento() {
  const [mementos, setMementos] = useState([]);

  useQuery(GET_MY_MEMENTOS, {
    onCompleted: data => {
      if (data && data.getMyUploadedMementos)
        setMementos(data.getMyUploadedMementos);
    },
  });

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
