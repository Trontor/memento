import {
  MementoName,
  NortonBox,
  NortonMsg,
  NortonTag,
  NortonTagsWrapper
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
    tag: "cat",
    confidence: "82%"
  }
];

export default function NortonVision() {
  return (
    <Container>
      <NortonBox>
        <NortonMsg>
          <Brain/>
          <h2>👀 Norton Vision 👀</h2> has identified the following tags for  <MementoName>Memento Title</MementoName>:
        </NortonMsg>
        <NortonTagsWrapper>
          {nortonTags.map(tag =>(
            <NortonTag>
              {tag.tag}
            </NortonTag>
          ))}
        </NortonTagsWrapper>
      </NortonBox>
    </Container>
  )
}
