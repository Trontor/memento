import {
  AuthorAvatar,
  AuthorWrapper,
  Card,
  CardContent,
  CardOptions,
  MementoAuthor,
  MementoCoverImg,
  MementoDescription,
  MementoInfo,
  MementoOverview,
  MementoTag,
  MementoTagsWrapper,
  MementoTitle,
  PeopleTags,
  UploadDate,
} from "./MementoCardStyles";
import { useHistory } from "react-router";
import React from "react";

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
    detectedLabels,
    beneficiaries,
    uploader,
    people,
  } = props;
  const createdDate = new Date(createdAt);

  return (
    <Card>
      <AuthorWrapper>
        <AuthorAvatar>
          {!uploader.imageUrl ? (
            <i className="fas fa-user-circle"></i>
          ) : (
            <img src={uploader.imageUrl} alt={uploader.firstName} />
          )}
        </AuthorAvatar>
        <div>
          <MementoAuthor>
            {uploader.firstName + " " + uploader.lastName}
          </MementoAuthor>
          <UploadDate>{createdDate.toLocaleDateString()}</UploadDate>
        </div>
        {/* Edit & Bookmark */}
        <CardOptions>
          <i
            className="fas fa-pencil-alt"
            onClick={() =>
              history.push(history.location.pathname + "/memento/" + mementoId)
            }
          ></i>
          <i className="far fa-bookmark"></i>
        </CardOptions>
      </AuthorWrapper>
      <CardContent>
        <MementoInfo>
          {/* Title */}
          <MementoTitle>{title}</MementoTitle>
          <MementoOverview>
            {/* Date */}
            <span>
              <i className="far fa-clock"></i>
              {dates[0].month.toString().padStart(2, "0")}/{dates[0].year}
            </span>
            {/* Location */}
            {location && (
              <span>
                <i className="fas fa-map-marker-alt"></i>
                {location}
              </span>
            )}
            {/* People Tags */}
            {people && people.length > 0 && (
              <span>
                <i className="fas fa-user-tag"></i>
                <div>
                  {props.people.map(person => (
                    <PeopleTags key={person.firstName}>
                      {person.firstName} {person.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
            {/* Beneficiary Tags */}
            {beneficiaries && beneficiaries.length > 0 && (
              <span>
                <i className="fas fa-user-tag"></i>
                <div>
                  {props.beneficiaries.map(beneficiary => (
                    <PeopleTags key={beneficiary.firstName}>
                      {beneficiary.firstName} {beneficiary.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
          </MementoOverview>

          {/* Description */}
          <MementoDescription>{description}</MementoDescription>
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
        <i className="fas fa-tags"></i>
        {props.tags.map(tag => (
          <MementoTag key={tag}>{tag}</MementoTag>
        ))}
      </MementoTagsWrapper>
      {/* Rekognition Tags */}
      <MementoTagsWrapper>
        <i className="fas fa-camera"></i>
        {detectedLabels.map(result => (
          <MementoTag key={result.name}>
            {result.name.toLowerCase()}{" "}
            <span>{Math.round(result.confidence, 0)}%</span>
          </MementoTag>
        ))}
      </MementoTagsWrapper>
    </Card>
  );
}
