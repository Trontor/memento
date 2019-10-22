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
  Bookmark,
} from "../MementoCard/MementoCardStyles";
import { Card, CardContent, CardInfo, FamilyGroup } from "./ViewMementoStyles";
import { ADD_BOOKMARK, DELETE_BOOKMARK } from "mutations/Memento";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/react-hooks";

export default function MementoCard(props) {
  const history = useHistory();
  const {
    userId,
    mementoId,
    createdAt,
    dates,
    title,
    description,
    location,
    family,
    // media,
    // tags,
    // type,
    // updatedAt,
    beneficiaries,
    uploader,
    people,
    bookmarkedBy,
    onBookmarkToggled,
  } = props;
  const createdDate = new Date(createdAt);

  const [bookmark] = useMutation(ADD_BOOKMARK, {
    variables: { id: mementoId },
    onCompleted: data => {
      onBookmarkToggled();
    },
  });

  const [removeBookmark] = useMutation(DELETE_BOOKMARK, {
    variables: { id: mementoId },
    onCompleted: data => {
      onBookmarkToggled();
    },
  });

  const isBookmarked = bookmarkedBy.some(id => id.userId === userId);

  const mementoDate = moment(
    dates[0].day.toString().padStart(2, "0") +
      "/" +
      dates[0].month.toString().padStart(2, "0") +
      "/" +
      dates[0].year,
    "DD-MM-YYYY",
  ).format("Do  MMM YYYY");

  return (
    <Card>
      <CardContent>
        {/* Cover Image */}
        {props.media.length > 0 && (
          <MementoCoverImg>
            <img alt={props.caption} src={props.media[0].url} />
          </MementoCoverImg>
        )}
      </CardContent>
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
            {/* Memento  Uploader  */}
            <MementoAuthor>
              {uploader.firstName + " " + uploader.lastName}
            </MementoAuthor>
            {/* Memento  Upload Date */}
            <UploadDate>
              {moment(createdDate.toLocaleDateString(), "DD-MM-YYYY").fromNow()}
            </UploadDate>
            {/* Family Group the memento belongs to */}
            <FamilyGroup>{props.family.name}</FamilyGroup>
          </div>
          {/* Edit & Bookmark */}
          <CardOptions>
            <i
              class="fas fa-pencil-alt"
              onClick={() => history.push(`/memento/${mementoId}/edit/`)}
            />
            <Bookmark
              onClick={() => (isBookmarked ? removeBookmark() : bookmark())}
              bookmarked={isBookmarked}
            >
              <i
                className={(isBookmarked ? "fas" : "far") + " fa-bookmark"}
              ></i>
            </Bookmark>
          </CardOptions>
        </AuthorWrapper>
        {/* Memento  Title */}
        <MementoTitle>{title}</MementoTitle>
        <MementoOverview>
          {/* Dates */}
          <span>
            <i className="far fa-clock" />
            {mementoDate}
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
              <i class="far fa-handshake"></i>
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
        {props.tags && props.tags.length > 0 && (
          <MementoTagsWrapper>
            <i class="fas fa-tags"></i>
            {props.tags.map(tag => (
              <MementoTag>{tag}</MementoTag>
            ))}
          </MementoTagsWrapper>
        )}
      </CardInfo>
    </Card>
  );
}
