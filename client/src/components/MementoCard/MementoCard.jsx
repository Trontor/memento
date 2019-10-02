import {
  AuthorAvatar,
  AuthorWrapper,
  BookmarkButton,
  Card,
  CardContent,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoInfo,
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
          <i class="far fa-bookmark"></i>
        </BookmarkButton>
      </AuthorWrapper>
      <CardContent>
        <MementoInfo>
          {/* Title */}
          <MementoTitle>{props.title}</MementoTitle>
          <MementoOverview>
          {/* Date */}
            <span>
              <i class="far fa-clock"></i>
              {props.dateCreated.year}
            </span>
            {/* Location */}
            {props.location && (
              <span>
              <i class="fas fa-map-marker-alt"></i>
              {props.location}
            </span>
            )}
            {/* People Tags */}
            {props.people.length > 0 && (
              <span>
                <i class="fas fa-user-tag"></i>
                <div>
                {props.people.map(person => (
                  <PeopleTags>
                    {person}
                  </PeopleTags>
                ))}
                </div>
              </span>
            )}
            </MementoOverview>

            {/* Description */}
             <MementoDescription>{props.description}</MementoDescription>
          </MementoInfo>
          {/* Cover Image */}
          {props.media.length > 0 && (
            <MementoCoverImg>
              <img src={props.media[0].url}/>
            </MementoCoverImg>
          )}
        </CardContent>
        {/* Tags */}
        <MementoTagsWrapper>
        <i class="fas fa-tags"></i>
          {props.tags.map(tag => (
            <MementoTags>{tag}</MementoTags>
          ))}
        </MementoTagsWrapper>
    </Card>
  );
}
