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
  MementoTags,
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
    // dates,
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
          <i
            class="fas fa-pencil-alt"
            onClick={() =>
              history.push(history.location.pathname + "/memento/" + mementoId)
            }
          ></i>
          <i class="far fa-bookmark"></i>
        </CardOptions>
      </AuthorWrapper>
      <CardContent>
        <MementoInfo>
          {/* Title */}
          <MementoTitle>Titel</MementoTitle>
          <MementoOverview>
            {/* Date */}
            <span>
              <i class="far fa-clock"></i>
              {createdDate.getFullYear()}
            </span>
            {/* Location */}
            {location && (
              <span>
                <i class="fas fa-map-marker-alt"></i>
                {location}
              </span>
            )}
            {/* People Tags */}
            {people && people.length > 0 && (
              <span>
                <i class="fas fa-user-tag"></i>
                <div>
                  {props.people.map(person => (
                    <PeopleTags>{person}</PeopleTags>
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
