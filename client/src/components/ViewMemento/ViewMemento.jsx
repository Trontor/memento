import React, { useState } from "react";
import { Container } from "ui/Helpers";
import { useQuery } from "@apollo/react-hooks";
import { GET_MEMENTOS } from "queries/Memento";
import ViewMementoCard from "./ViewMementoCard";

export default function ViewMemento() {
  const [mementos, setMementos] = useState([]);

  const loadMemento = useQuery(GET_MEMENTOS, {
    variables: {
      id: "5d8c80b8c4a4ad02c5722152",
    },
    onCompleted: data => {
      if (data && data.mementos) setMementos(data.mementos);
      console.log(data);
    },
  });

  return (
    <Container>
      {mementos.map(memento => {
        console.log(memento);
        return <ViewMementoCard {...memento} />;
      })}
    </Container>
  );
}
