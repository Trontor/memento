import React, { useState } from "react";

import { Container } from "ui/Helpers";
// import { GET_MEMENTOS } from "queries/Memento";
import ViewMementoCard from "./ViewMementoCard";

// import { useQuery } from "@apollo/react-hooks";

export default function ViewMemento() {
  const [mementos, setMementos] = useState([]);

  // const loadMemento = useQuery(GET_MEMENTOS, {
  //   variables: {
  //     id: "5d849da7a450cc02c84e7629",
  //   },
  //   onCompleted: data => {
  //     if (data && data.mementos) setMementos(data.mementos);
  //     console.log(data);
  //   },
  // });

  return (
    <Container>
      {mementos.map(memento => {
        console.log(memento);
        return <ViewMementoCard {...memento} />;
      })}
    </Container>
  );
}
