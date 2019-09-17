import React, { useState } from "react";
import { InstructionLabel, InputField, FormSection, TextArea } from "ui/Forms";
import { AlignRight } from "ui/Helpers";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";
import { TagsContainer, Tag, NewTag } from "./UploadMementoStyles";
import { MediaDropzone } from "./MediaDropzone";
import Textarea from "react-textarea-autosize";
import DateSelector from "components/DateSelector/DateSelector";

export default function UploadStep1({
    selectTag,
    mementoTags,
    customDropdown,
}) {
    const tags = [
        "recipes",
        "painting",
        "stuffed toys",
        "cars",
        "jewellery",
        "photographs",
        "clothing",
        "family",
        "blanket",
        "food",
    ];

    const [defaultTags, setDefaultTags] = useState(tags);

    const [newTag, setNewTag] = useState(null);

    const handleChange = tag => {
        tag = tag.target.value;
        setNewTag(tag);
    };

    return (
        <>
            <FormSection>
                <InstructionLabel>Add a title:</InstructionLabel>
                <InputField placeholder="Enter a cool title..." />
            </FormSection>

            <FormSection>
                <InstructionLabel>Describe your memento:</InstructionLabel>
                <TextArea>
                    <Textarea placeholder="Enter a cool description..." />
                </TextArea>
            </FormSection>

            <FormSection>
                <InstructionLabel>
                    Enter a date of significance for this memento.
                </InstructionLabel>
                <DateSelector customDropdown={customDropdown} />
            </FormSection>

            <FormSection>
                <InstructionLabel>Add media files:</InstructionLabel>
                <MediaDropzone />
            </FormSection>

            <FormSection>
                <InstructionLabel>
                    What does your memento contain?
                </InstructionLabel>
                <TagsContainer>
                    {tags.sort().map(tag => (
                        <Tag
                            onClick={() => selectTag(tag)}
                            selected={mementoTags.includes(tag)}
                        >
                            {tag}
                        </Tag>
                    ))}
                    <NewTag onClick={() => setNewTag("")}>
                        <i class="fas fa-plus"></i> edit/new
                    </NewTag>
                </TagsContainer>

                {newTag !== null && (
                    <>
                        <InputField
                            placeholder="New tag name"
                            value={newTag}
                            onChange={e => handleChange(e)}
                            // onBlur={() => setDefaultTags([...defaultTags, newTag])}
                        />

                        <ButtonPrimary
                            onClick={() =>
                                setDefaultTags([...defaultTags, newTag])
                            }
                        >
                            Create new tag
                        </ButtonPrimary>

                        <AlignRight>
                            <ButtonSecondary onClick={() => setNewTag(null)}>
                                Cancel
                            </ButtonSecondary>
                        </AlignRight>
                    </>
                )}
            </FormSection>
        </>
    );
}
