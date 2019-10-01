import {
  AuthorAvatar,
  AuthorWrapper,
  BookmarkButton,
  Card,
  CardContent,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoOverview,
  MementoTags,
  MementoTagsWrapper,
  MementoTitle,
  PeopleTags,
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
        {/* Bookmark */}
        <BookmarkButton>
          <i class="fas fa-thumbtack"></i>
        </BookmarkButton>
      </AuthorWrapper>
      <CardContent>
        {/* Title */}
        <MementoTitle>{props.title}</MementoTitle>
        {/* Overview */}
        <MementoOverview>
          {/* {props.mementoType === "event" && (
            <div>
              <i class="far fa-calendar-alt"></i>
              {props.eventType}
            </div>
          )} */}
        {/* Date */}
          <div>
            <i class="far fa-clock"></i>
            {props.dateCreated.year}
          </div>
        {/* Location */}
          {props.location && (
            <div>
            <i class="fas fa-map-marker-alt"></i>
            {props.location}
          </div>
          )}
        {/* People Tags */}
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
        {/* Description */}
        <MementoDescription>{props.description}</MementoDescription>
        {/* Cover Image */}
        {props.media.length > 0 && (
          <MementoCoverImg>
            <img src={props.media[0].url}/>
          </MementoCoverImg>
        )}
        {/* Tags */}
        <MementoTagsWrapper>
        <i class="fas fa-tags"></i>
          {props.tags.map(tag => (
            <MementoTags>{tag}</MementoTags>
          ))}
        </MementoTagsWrapper>
      </CardContent>
    </Card>
  );
}
