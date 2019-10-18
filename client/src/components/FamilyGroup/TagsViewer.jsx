import React from "react";
import { TagRow } from "./FamilyGroupStyles";

export default function TagsViewer(props) {
  return (
    <>
      {props.tags.sort().map(tag => (
        <TagRow
          key={tag}
          onClick={() => props.selectTag(tag)}
          selected={props.mementoTags.includes(tag)}
        >
          <span>{tag}</span>
        </TagRow>
      ))}
    </>
  );
}
