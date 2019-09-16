import React from "react";
import {
  Card,
  MementoTitle,
  UploadDate,
  MementoDate,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoTags
 } from "./MementoCardStyles";

export default function MementoCard(props) {
  return(
   <Card>
    <MementoTitle>{props.title}</MementoTitle>
    <UploadDate>{props.dateUploaded}</UploadDate>
    <MementoDate>{props.dateCreated}</MementoDate>
    <MementoAuthor>{props.author}</MementoAuthor>
    <MementoDescription>{props.description}</MementoDescription>
    <MementoCoverImg></MementoCoverImg>
    {props.tags.map(tag => (
      <MementoTags>{tag}</MementoTags>)
    )}
   </Card>
  );
}
