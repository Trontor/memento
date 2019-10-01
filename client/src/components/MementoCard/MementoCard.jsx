import {
  AuthorAvatar,
  AuthorWrapper,
  Card,
  CardContent,
  MementoAuthor,
  MementoCoverImg,
  MementoDate,
  MementoDescription,
  MementoEvent,
  MementoLocation,
  MementoOverview,
  MementoTags,
  MementoTagsWrapper,
  MementoTitle,
  PeopleTags,
  PeopleTagsWrapper,
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

        <MementoOverview>
          {props.mementoType === "event" && (
            <div>
              <i class="far fa-calendar-alt"></i>
              {props.eventType}
            </div>
          )}
          <div>
            <i class="far fa-clock"></i>
            {props.dateCreated.year}
          </div>
          {props.location && (
            <div>
            <i class="far fa-compass"></i>
            {props.location}
          </div>
          )}

          {props.people.length > 0 && (
            <div>
              <i class="fas fa-user-tag"></i>
              <div>
              {props.people.map(person => (
                <PeopleTags>
                  {person}
                </PeopleTags>
              ))}
              </div>
            </div>
          )}
        </MementoOverview>
        <MementoDescription>{props.description}</MementoDescription>
        <MementoCoverImg></MementoCoverImg>
        <MementoTagsWrapper>
          {props.tags.map(tag => (
            <MementoTags>{tag}</MementoTags>
          ))}
        </MementoTagsWrapper>
        <i class="far fa-bookmark"></i>
      </CardContent>
    </Card>
  );
}
