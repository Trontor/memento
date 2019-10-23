import {
  DoneBtn,
  MementoName,
  NortonBox,
  NortonMsg,
  NortonRating,
  NortonTag,
  NortonTagsWrapper,
  SelectMsg
} from "./NortonVisionStyles";

import { ReactComponent as Brain } from "components/JollyLoader/brain.svg";
import { Container } from "ui/Helpers";
import React from 'react'

const nortonTags = [
  {
    tag: "pig",
    confidence: "99%"
  },
  {
    tag: "dog",
    confidence: "89%"
  },
  {
    tag: "hippopotamus",
    confidence: "79%"
  },
  {
    tag: "ligma",
    confidence: "75%"
  },
  {
    tag: "rohylrohylrohyl",
    confidence: "69%"
  },
];

let selectedTags = 1;

export default function NortonVision() {

  return (
    <Container>
      <NortonBox>
        <NortonMsg>
          <Brain/>
          {nortonTags.length > 0 ? (
            <>
              <h2><span role="img" aria-label="emoji">👀</span> Norton Vision <span role="img" aria-label="emoji">👀</span></h2>
              has identified the following tags for  <MementoName>Memento Title</MementoName>:
              <NortonTagsWrapper>
                {nortonTags.map(tag =>(
                  <NortonTag>
                    {tag.tag}
                    <span>
                      {tag.confidence}
                    </span>
                  </NortonTag>
                ))}
              </NortonTagsWrapper>
              <SelectMsg>
                Feel free to select or deselect tags.
              </SelectMsg>
                <NortonRating>
                  <div>5 out of 5 tags selected.</div>
                  {selectedTags === 1 ? (
                    <span>Norton is doing an excellent job! :D</span>
                  ):
                  selectedTags >= 0.7 && selectedTags < 1 ? (
                    <span>Norton is doing a good job! :)</span>
                  ):
                  selectedTags >= 0.33 && selectedTags < 0.7 ? (
                    <span>Norton is doing an okay job! :/</span>
                  ):
                  selectedTags >= 0.01 && selectedTags < 0.33 ? (
                    <span>Norton is doing a poor job. :c </span>
                  ):
                  <span>Sorry, Norton will do better next time.</span>
                }
                </NortonRating>
              <DoneBtn>Done</DoneBtn>
            </>
          ) : (
            <>
              <h2><span role="img" aria-label="emoji">😬</span> Well that's embarassing...</h2>
              Norton Vision has failed to read your memento.
            </>
          )
          }
        </NortonMsg>
      </NortonBox>
    </Container>
  )
}
