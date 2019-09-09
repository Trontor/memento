import React from "react";
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { TagsContainer, Tag, NewTag } from "./UploadMementoStyles";

export default function UploadStep1({ selectTag, mementoTags }){
  const tags = ["recipes", "painting", "stuffed toys", "cars", "jewellery", "photographs", "clothing", "family", "blanket", "food"];

  return(
    <>
      <FormSection>
        <InstructionLabel>What does your memento contain?</InstructionLabel>
        <TagsContainer>
          { tags.sort().map(tag =>
            <Tag
              onClick={() => selectTag(tag)}
              selected={mementoTags.includes(tag)}>
              {tag}
            </Tag>
          )}
            <NewTag><i class="fas fa-plus"></i> edit/new</NewTag>
        </TagsContainer>
      </FormSection>
    </>
  )
}