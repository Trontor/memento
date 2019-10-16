import {
  AuthorAvatar,
  AuthorWrapper,
  CardOptions,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoTagsWrapper,
  MementoTitle,
  MementoOverview,
  PeopleTags,
  MementoTag,
  UploadDate,
} from "../MementoCard/MementoCardStyles";
import React from "react";
import { Card, CardInfo, CardContent, FamilyGroup } from "./ViewMementoStyles";
import { useHistory } from "react-router";

export default function MementoCard(props) {
  const history = useHistory();
  const {
    mementoId,
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
  console.log(props);
  const createdDate = new Date(createdAt);

  return (
    <Card>
      <CardInfo>
        <AuthorWrapper>
          {/* Memento  Uploader Profile Picture */}
          <AuthorAvatar>
            {!uploader.imageUrl ? (
              <i class="fas fa-user-circle"></i>
            ) : (
              <img src={uploader.imageUrl} alt={uploader.firstName} />
            )}
          </AuthorAvatar>
          <div>
            {/* Memento  Uploader  */}
            <MementoAuthor>
              {uploader.firstName + " " + uploader.lastName}
            </MementoAuthor>
            {/* Memento  Upload Date */}
            <UploadDate>{createdDate.toLocaleDateString()}</UploadDate>
            {/* change family group here */}
            <FamilyGroup>Valerie's Family</FamilyGroup>
          </div>
          {/* Edit & Bookmark */}
          <CardOptions>
            <i
              class="fas fa-pencil-alt"
              onClick={() =>
                history.push(history.location.pathname + "/edit/" + mementoId)
              }
            />
            <i class="far fa-bookmark"></i>
          </CardOptions>
        </AuthorWrapper>
        {/* Memento  Title */}
        <MementoTitle>{title}</MementoTitle>
        <MementoOverview>
          {/* Dates */}
          <span>
            <i class="far fa-clock" />
            {dates[0].year}
          </span>
          {/* Location */}
          <span>
            <i class="fas fa-map-marker-alt" />
            {location}
          </span>
          {/* People Tags */}
          {people && people.length > 0 && (
            <span>
              <i class="fas fa-user-tag"></i>
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
              <i class="fa fa-users" aria-hidden="true" />
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
          <i class="fas fa-tags"></i>
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
