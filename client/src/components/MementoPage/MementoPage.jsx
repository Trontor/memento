import {
  AuthorAvatar,
  AuthorWrapper,
  CardOptions,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoOverview,
  MementoTag,
  MementoTagsWrapper,
  MementoTitle,
  PeopleTags,
  UploadDate,
} from "../MementoCard/MementoCardStyles";
import { Card, CardContent, CardInfo, FamilyGroup } from "./MementoPageStyles";

import React from "react";

export default function MementoPage(props) {
  const {
    //mementoId,
    createdAt,
    dates,
    title,
    description,
    location,
    // media,
    // tags,
    // type,
    // updatedAt,
    beneficiaries,
    uploader,
    people,
  } = props;
  const createdDate = new Date(createdAt);

  return (
    <Card>
      <CardInfo>
        <AuthorWrapper>
          {/* Memento  Uploader Profile Picture */}
          <AuthorAvatar>
            {!uploader.imageUrl ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <img src={uploader.imageUrl} alt={uploader.firstName} />
            )}
          </AuthorAvatar>
          <div>
            {/* change family group here */}
            <FamilyGroup>Valerie's Family</FamilyGroup>
            {/* Memento  Upload Date */}
            <UploadDate>{createdDate.toLocaleDateString()}</UploadDate>
          </div>
          {/* Bookmark */}
          <CardOptions>
            <i className="far fa-bookmark"></i>
          </CardOptions>
        </AuthorWrapper>
        {/* Memento  Title */}
        <MementoTitle>{title}</MementoTitle>
        <MementoOverview>
          {/* Dates */}
          <span>
            <i className="far fa-clock" />
            {dates[0].year}
          </span>
          {/* Location */}
          <span>
            <i className="fas fa-map-marker-alt" />
            {location}
          </span>
          {/* People Tags */}
          {people && people.length > 0 && (
            <span>
              <i className="fas fa-user-tag"></i>
              <div>
                {props.people.map(person => (
                  <PeopleTags>
                    {person.firstName} {person.lastName}
                  </PeopleTags>
                ))}
              </div>
            </span>
          )}
          {/* Beneficiary Tags */}
          {beneficiaries && beneficiaries.length > 0 && (
            <span>
              <i className="fa fa-users" aria-hidden="true" />
              <div>
                {props.beneficiaries.map(beneficiary => (
                  <PeopleTags>
                    {beneficiary.firstName} {beneficiary.lastName}
                  </PeopleTags>
                ))}
              </div>
            </span>
          )}
        </MementoOverview>

        {/* Description */}
        <MementoDescription>{description}</MementoDescription>

        {/* Tags */}
        <MementoTagsWrapper>
          <i className="fas fa-tags"></i>
          {props.tags.map(tag => (
            <MementoTag>{tag}</MementoTag>
          ))}
        </MementoTagsWrapper>
      </CardInfo>
      <CardContent>
        {/* Cover Image */}
        {props.media.length > 0 && (
          <MementoCoverImg>
            <img alt={props.caption} src={props.media[0].url} />
          </MementoCoverImg>
        )}
      </CardContent>
    </Card>
  );
}
