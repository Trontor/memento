import {
  AuthorAvatar,
  AuthorWrapper,
  CardContent,
  CardOptions,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoInfo,
  MementoOverview,
  MementoTags,
  MementoTagsWrapper,
  MementoTitle,
  PeopleTags,
  UploadDate,
} from "../MementoCard/MementoCardStyles";
import { useHistory } from "react-router";
import React from "react";
import { Card, CardInfo, List, InfoWrapper } from "./ViewMementoStyles";

export default function MementoCard(props) {
  const history = useHistory();
  const {
    mementoId,
    createdAt,
    dates,
    // description,
    location,
    // media,
    // tags,
    // type,
    // updatedAt,
    uploader,
    people,
  } = props;
  const createdDate = new Date(createdAt);

  return (
    <Card>
      <CardInfo>
        <AuthorWrapper>
          <AuthorAvatar>
            <i class="fas fa-user-circle"></i>
          </AuthorAvatar>
          <div>
            <MementoAuthor>
              {uploader.firstName + " " + uploader.lastName}
            </MementoAuthor>
            <UploadDate>{createdDate.toLocaleDateString()}</UploadDate>
          </div>
          {/* Edit & Bookmark */}
          <CardOptions>
            <i class="far fa-bookmark"></i>
          </CardOptions>
        </AuthorWrapper>
        {/* Title */}
        <MementoTitle>Title</MementoTitle>
        <InfoWrapper>
          <List size="20px" />
          {dates[0].year}
          <br />
          <List size="20px" />
          {location}
          <List size="20px" />
          FirstName
        </InfoWrapper>
        {/* Description */}
        <MementoDescription>{props.description}</MementoDescription>
      </CardInfo>
      <CardContent>
        <MementoInfo>
          {/* Description */}
          <MementoDescription>{props.description}</MementoDescription>
        </MementoInfo>
        {/* Cover Image */}
        {props.media.length > 0 && (
          <MementoCoverImg>
            <img alt={props.caption} src={props.media[0].url} />
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
