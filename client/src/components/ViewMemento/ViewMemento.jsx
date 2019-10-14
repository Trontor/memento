import React, { useState } from "react";
import { Container } from "ui/Helpers";
import { useQuery } from "@apollo/react-hooks";
import { GET_MEMENTOS } from "queries/Memento";
import ViewMementoCard from "./ViewMementoCard";
import NoViewMemento from "./NoViewMemento";

export default function ViewMemento() {
  const [mementos, setMementos] = useState([]);

  const loadMemento = useQuery(GET_MEMENTOS, {
    variables: {
      id: "5d849da7a450cc02c84e7629",
    },
    onCompleted: data => {
      if (data && data.mementos) setMementos(data.mementos);
      console.log(data);
    },
  });

  if (mementos.length == 0) {
    return <NoViewMemento />;
  }

  return (
    <Container>
      {mementos.map(memento => {
        console.log(memento);
        return <ViewMementoCard {...memento} />;
      })}
    </Container>
  );
}
