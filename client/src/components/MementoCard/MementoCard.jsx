import {
  AuthorAvatar,
  AuthorWrapper,
  Card,
  CardContent,
  MementoAuthor,
  MementoCoverImg,
  MementoDate,
  MementoDescription,
  MementoLocation,
  MementoTags,
  MementoTitle,
  UploadDate
} from "./MementoCardStyles";

import React from "react";

export default function MementoCard(props) {
  return (
    <Card>
      <AuthorWrapper>
        <AuthorAvatar>
          <i class="fas fa-user-circle"></i>
        </AuthorAvatar>
        <div>
          <MementoAuthor>{props.author}</MementoAuthor>
          <UploadDate>{props.dateUploaded}</UploadDate>
        </div>
      </AuthorWrapper>
      <CardContent>
        <MementoTitle>{props.title}</MementoTitle>
        <MementoDate>
          <i class="far fa-clock"></i>
          {props.dateCreated}
        </MementoDate>
        <MementoLocation>
          <i class="far fa-compass"></i>
          {props.location}
        </MementoLocation>
        <MementoDescription>{props.description}</MementoDescription>
        <MementoCoverImg></MementoCoverImg>
        {props.tags.map(tag => (
          <MementoTags>{tag}</MementoTags>
        ))}
      </CardContent>
    </Card>
  );
}
