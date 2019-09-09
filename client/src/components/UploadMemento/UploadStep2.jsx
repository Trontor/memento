import React from "react";
import { InstructionLabel, InputField, FormHelpText, FormSection } from 'ui/Forms';
import { TagsContainer, Tag, NewTag , UploadFileButton, UploadFileIcon, UploadFileLabel, UploadFileContainer} from "./UploadMementoStyles";

export default function UploadStep1({ selectTag, mementoTags }){
  const tags = ["recipes", "painting", "stuffed toys", "cars", "jewellery", "photographs", "clothing", "family", "blanket", "food"];

  const mediaTypes = [
    {type: "Photo", icon: "fas fa-image"},
    {type: "Video", icon: "fas fa-film"},
    {type: "Audio", icon: "fas fa-microphone"}
  ]

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

      <FormSection>
        <InstructionLabel>Upload your mementos</InstructionLabel>

        <UploadFileContainer>
          {mediaTypes.map(media => (
            <UploadFileButton>
              <UploadFileIcon>
              <i class={media.icon}></i>
              </UploadFileIcon>
              <UploadFileLabel>
                {media.type}
              </UploadFileLabel>
            </UploadFileButton>
          ))}
        </UploadFileContainer>

      </FormSection>
    </>
  )
}