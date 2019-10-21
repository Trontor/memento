import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_A_MEMENTO } from "queries/Memento";
import JollyLoader from "components/JollyLoader/JollyLoader";

export default function MementoPage() {
  /** Hooks */
  const history = useHistory();
  const { mementoId } = useParams();
  const [memento, setMemento] = useState(null);
  // Load the memento data
  useQuery(GET_A_MEMENTO, {
    variables: { id: mementoId },
    onCompleted: data => {
      if (data && data.memento) setMemento(data.memento);
    },
  });

  /** Loading/Error state management */
  if (!memento) {
    return <JollyLoader />;
  }

  /** Business Logic */

  return <div>{memento.mementoId}</div>;
}
