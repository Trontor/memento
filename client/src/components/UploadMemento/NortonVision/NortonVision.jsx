import { useQuery, useMutation } from "@apollo/react-hooks";
import { ReactComponent as Brain } from "components/JollyLoader/brain.svg";
import JollyLoader from "components/JollyLoader/JollyLoader";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "ui/Helpers";
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
import { GET_VISION_MEMENTO } from "queries/Memento";
import { UPDATE_MEMENTO } from "mutations/Memento";

let selectedTags = 1;

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
                <div>5 out of 5 tags selected.</div>
                {selectedTags === 1 ? (
                  <span>Norton is doing an excellent job! :D</span>
                ) : selectedTags >= 0.7 && selectedTags < 1 ? (
                  <span>Norton is doing a good job! :)</span>
                ) : selectedTags >= 0.33 && selectedTags < 0.7 ? (
                  <span>Norton is doing an okay job! :/</span>
                ) : selectedTags >= 0.01 && selectedTags < 0.33 ? (
                  <span>Norton is doing a poor job. :c </span>
                ) : (
                  <span>Sorry, Norton will do better next time.</span>
                )}
              </NortonRating>
              <DoneBtn onClick={onSubmit}>Look's Good!</DoneBtn>
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
