import { ADD_BOOKMARK, DELETE_BOOKMARK } from "mutations/Memento";
import {
  AuthorAvatar,
  AuthorWrapper,
  Bookmark,
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
  SpecialMemento,
  UploadDate,
} from "./MementoCardStyles";
import React, { useState } from "react";

import InheritanceTree from "components/InheritanceTree/InheritanceTree";
import moment from "moment";
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
    media,
    caption,
    tags,
    type,
    // updatedAt,
    family,
    detectedLabels,
    bookmarkedBy,
    beneficiaries,
    uploader,
    people,
    onBookmarkToggled,
  } = props;

  const createdDate = new Date(createdAt);
  const [showInheritanceTree, setShowInheritanceTree] = useState(false);
  const [optimisticBookmark, setOptimisticBookmark] = useState(false);
  const [bookmark] = useMutation(ADD_BOOKMARK, {
    variables: { id: mementoId },
    onCompleted: data => {
      if (data) onBookmarkToggled();
    },
  });

  const [removeBookmark] = useMutation(DELETE_BOOKMARK, {
    variables: { id: mementoId },
    onCompleted: data => {
      if (data) onBookmarkToggled();
    },
  });
  const isBookmarked =
    optimisticBookmark || bookmarkedBy.some(id => id.userId === userId);
  // if (isBookmarked && optimisticBookmark) {
  //   setOptimisticBookmark(false);
  // }

  const isUploader = uploader.userId === userId;
  // console.log(userId, props);

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
          <UploadDate>
            {moment
              .utc(createdDate)
              .local()
              .fromNow()}
          </UploadDate>
        </div>
        {/* Edit & Bookmark */}
        <CardOptions familyColour={family.colour}>
          {beneficiaries && beneficiaries.length > 0 && (
            <i
              className="fas fa-sitemap"
              onClick={() => setShowInheritanceTree(!showInheritanceTree)}
            />
          )}
          {isUploader && detectedLabels.length > 0 && (
            <i
              className="fas fa-eye"
              onClick={() => history.push("/memento/" + mementoId + "/vision")}
            />
          )}
          {isUploader && (
            <i
              className="fas fa-pencil-alt"
              onClick={() => history.push("/memento/" + mementoId + "/edit")}
            />
          )}
          <i
            className="fas fa-link"
            onClick={() => history.push("/memento/" + mementoId)}
          />
          <Bookmark
            onClick={() => {
              setOptimisticBookmark(!isBookmarked);
              if (!isBookmarked) {
                bookmark();
              } else {
                removeBookmark();
              }
            }}
            bookmarked={isBookmarked}
            familyColour={family.colour}
          >
            <i className={(isBookmarked ? "fas" : "far") + " fa-bookmark"}></i>
          </Bookmark>
        </CardOptions>
      </AuthorWrapper>
      <CardContent>
        <MementoInfo>
          {/* Title */}
          <MementoTitle onClick={() => history.push("/memento/" + mementoId)}>
            {title}
          </MementoTitle>
          <MementoOverview card familyColour={family.colour}>
            {/* Special Event */}
            {type && !["Test", "item", "memento"].includes(type) && (
              <span>
                <i className="far fa-calendar-alt"></i>
                <SpecialMemento familyColour={family.colour}>
                  {type}
                </SpecialMemento>
              </span>
            )}
            {/* Date */}
            <span>
              <i className="far fa-clock"></i>
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
                {people.map(person => (
                  <PeopleTags
                    key={person.firstName}
                    onClick={() => history.push("/profile/" + person.userId)}
                    familyColour={family.colour}
                  >
                    {person.firstName} {person.lastName}
                  </PeopleTags>
                ))}
              </span>
            )}
            {/* Beneficiary Tags */}
            {beneficiaries && beneficiaries.length > 0 && (
              <span>
                <i className="far fa-handshake"></i>
                <div>
                  {beneficiaries.map(beneficiary => (
                    <PeopleTags key={beneficiary.firstName}>
                      {beneficiary.firstName} {beneficiary.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
          </MementoOverview>

          {/* Description */}
          <MementoDescription card>{description}</MementoDescription>
        </MementoInfo>
        {/* Cover Image */}
        {showInheritanceTree && beneficiaries.length > 0 ? (
          <InheritanceTree
            width="100%"
            height="400px"
            mementoId={mementoId}
            familyColour={family.colour}
          />
        ) : (
          media.length > 0 && (
            <MementoCoverImg
              onClick={() => history.push("/memento/" + mementoId)}
            >
              <img alt={caption} src={media[0].url} />
            </MementoCoverImg>
          )
        )}
      </CardContent>
      {/* Tags */}
      {tags && tags.length > 0 && (
        <MementoTagsWrapper familyColour={family.colour}>
          <i className="fas fa-tags"></i>
          {tags.map(tag => (
            <MementoTag
              onClick={() => {
                if (props.onTagClicked) {
                  props.onTagClicked(tag);
                }
              }}
              familyColour={family.colour}
            >
              {tag}
            </MementoTag>
          ))}
        </MementoTagsWrapper>
      )}
      {/* Rekognition Tags */}
      {detectedLabels && detectedLabels.length > 0 && (
        <MementoTagsWrapper familyColour={family.colour}>
          <i className="far fa-eye"></i>
          {detectedLabels.map(result => (
            <MementoTag
              onClick={() => {
                if (props.onTagClicked) {
                  props.onTagClicked(result.name.toLowerCase());
                }
              }}
              key={result.name}
              familyColour={family.colour}
            >
              {result.name.toLowerCase()}{" "}
              <span>{Math.round(result.confidence, 0)}%</span>
            </MementoTag>
          ))}
        </MementoTagsWrapper>
      )}
    </Card>
  );
}
