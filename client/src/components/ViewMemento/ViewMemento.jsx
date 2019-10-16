import React, { useState } from "react";
import { Container } from "ui/Helpers";
import { useQuery } from "@apollo/react-hooks";
import { GET_MEMENTOS } from "queries/Memento";
import ViewMementoCard from "./ViewMementoCard";
import NoViewMemento from "./NoViewMemento";

export default function ViewMemento() {
  const [mementos, setMementos] = useState([]);

  useQuery(GET_MEMENTOS, {
    variables: {
      //id: "5d849da7a450cc02c84e7629",
      id: "5d8c80b8c4a4ad02c5722152", //need to remove other uploader's memento
    },
    onCompleted: data => {
      if (data && data.mementos) setMementos(data.mementos);
    },
  });
  console.log(mementos);
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
