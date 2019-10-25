import JollyLoader from "components/JollyLoader/JollyLoader";
import MementoCard from "components/MementoCard/MementoCard";
import { MementoCardColumns } from "./MementosViewerStyles";
import NoMementos from "./NoMementos";
import React from "react";

export default function MementosViewer(props) {
  const { mementos, refreshMementos } = props;

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

  const onMementoTagClicked = tag => {
    props.cardTagClicked(tag);
  };
  return (
    <>
      {mementos && mementos.length === 0 ? (
        <NoMementos familyColour={props.familyColour} />
      ) : (
        <MementoCardColumns>
          {filteredMementos.map(memento => (
            <MementoCard
              userId={props.userId}
              key={memento.mementoId}
              onBookmarkToggled={refreshMementos}
              onTagClicked={onMementoTagClicked}
              {...memento}
            />
          ))}
        </MementoCardColumns>
      )}
    </>
  );
}
