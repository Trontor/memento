import {
  DoneBtn,
  MementoName,
  NortonBox,
  NortonMsg,
  NortonRating,
  NortonTag,
  NortonTagsWrapper,
  SelectMsg,
} from "./NortonVisionStyles";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { ReactComponent as Brain } from "components/JollyLoader/brain.svg";
import { Container } from "ui/Helpers";
import { GET_VISION_MEMENTO } from "queries/Memento";
import JollyLoader from "components/JollyLoader/JollyLoader";
import { UPDATE_MEMENTO } from "mutations/Memento";

const effectivenessMessage = ratio => {
  if (ratio === 1) {
    return "Norton seems to be doing an excellent job!";
  }
  if (ratio > 0.66) {
    return "Norton is doing a good job!";
  }
  if (ratio > 0.3) {
    return "Norton is doing an okay job.";
  }
  if (ratio > 0) {
    return "Norton is doing a poor job :c ";
  }
  return "Sorry, Norton will do better next time.";
};
export default function NortonVision() {
  const { mementoId } = useParams();
  const history = useHistory();
  const [memento, setMemento] = useState(null);
  const [tags, setTags] = useState(null);
  useQuery(GET_VISION_MEMENTO, {
    variables: { id: mementoId },
    onCompleted: data => {
      if (data && data.memento) {
        setMemento(data.memento);
        setTags(
          data.memento.detectedLabels.map(tag => ({ ...tag, selected: true })),
        );
      }
    },
  });
  const [updateMemento] = useMutation(UPDATE_MEMENTO, {
    onCompleted: data => {
      if (data && data.updateMemento) {
        history.push("/memento/" + data.updateMemento.mementoId);
      }
    },
  });
  if (!memento) {
    return <JollyLoader />;
  }

  const onSubmit = () => {
    updateMemento({
      variables: {
        input: {
          mementoId: memento.mementoId,
          detectedLabels: tags
            .filter(tag => tag.selected)
            .map(tag => ({
              name: tag.name,
              confidence: tag.confidence,
            })),
        },
      },
    });
  };
  const selectedCount = tags.filter(tag => tag.selected).length;
  const selectedRatio = selectedCount / tags.length;

  return (
    <Container>
      <NortonBox>
        <NortonMsg>
          <Brain />
          {memento.detectedLabels.length > 0 ? (
            <>
              <h2>
                <span role="img" aria-label="emoji">
                  👀
                </span>{" "}
                Norton Vision{" "}
                <span role="img" aria-label="emoji">
                  👀
                </span>
              </h2>
              has identified the following tags for{" "}
              <MementoName>{memento.title}</MementoName>:
              <NortonTagsWrapper>
                {tags.map((tag, idx) => (
                  <NortonTag
                    selected={tag.selected}
                    key={idx}
                    onClick={() => {
                      const tagsCopy = [...tags];
                      tagsCopy[idx].selected = !tag.selected;
                      setTags(tagsCopy);
                    }}
                  >
                    {tag.name.toLowerCase()}
                    <span>{Math.round(tag.confidence)}% confident</span>
                  </NortonTag>
                ))}
              </NortonTagsWrapper>
              <SelectMsg>Feel free to deselect tags you don't like.</SelectMsg>
              <NortonRating>
                <div>
                  {selectedCount} of {tags.length} tags selected.
                </div>
                <span>{effectivenessMessage(selectedRatio)}</span>
              </NortonRating>
              <DoneBtn onClick={onSubmit}>Looks Good!</DoneBtn>
            </>
          ) : (
            <>
              <h2>
                <span role="img" aria-label="emoji">
                  😬
                </span>
                Sorry...
              </h2>
              Norton Vision hasn't found anything of significance in your
              memento.
            </>
          )}
        </NortonMsg>
      </NortonBox>
    </Container>
  );
}
