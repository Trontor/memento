import MementoCard from "components/MementoCard/MementoCard";
import { MementoCardColumns } from "./MementosViewerStyles";
import React from "react";
import JollyLoader from "components/JollyLoader/JollyLoader";

export default function MementosViewer(props) {
  const { mementos } = props;

  if (!mementos) {
    return <JollyLoader />;
  }

  let filteredMementos = mementos;
  if (props.filterTags && props.filterTags.length > 0) {
    filteredMementos = mementos.filter(
      m =>
        m.tags.some(tag => props.filterTags.includes(tag)) ||
        m.detectedLabels.some(l =>
          props.filterTags.includes(l.name.toLowerCase()),
        ),
    );
  }

  return (
    <MementoCardColumns>
      {filteredMementos.map(memento => (
        <MementoCard key={memento.mementoId} {...memento} />
      ))}
    </MementoCardColumns>
  );
}
