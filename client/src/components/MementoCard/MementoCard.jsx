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
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { ADD_BOOKMARK, DELETE_BOOKMARK } from "mutations/Memento";
import InheritanceTree from "components/InheritanceTree/InheritanceTree";

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
    // media,
    // tags,
    // type,
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

  const isUploader = uploader.userId === userId;
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
          {beneficiaries && beneficiaries.length > 0 && (
            <i
              className="fas fa-tree"
              onClick={() => setShowInheritanceTree(!showInheritanceTree)}
            />
          )}
          {isUploader && (
            <i
              className="fas fa-pencil-alt"
              onClick={() => history.push("/memento/" + mementoId + "/edit")}
            />
          )}
          <i
            className={(isBookmarked ? "fa " : "far ") + "fa-bookmark"}
            onClick={() => (isBookmarked ? removeBookmark() : bookmark())}
          ></i>
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
                <i class="far fa-handshake"></i>
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
        {showInheritanceTree && beneficiaries.length > 0 ? (
          <InheritanceTree
            width="100%"
            height="400px"
            mementoId={mementoId}
            familyColour={family.colour}
          />
        ) : (
          props.media.length > 0 && (
            <MementoCoverImg>
              <img alt={props.caption} src={props.media[0].url} />
            </MementoCoverImg>
          )
        )}
      </CardContent>
      {/* Tags */}
      {props.tags && props.tags.length > 0 && (
        <MementoTagsWrapper>
          <i class="fas fa-tags"></i>
          {props.tags.map(tag => (
            <MementoTag>{tag}</MementoTag>
          ))}
        </MementoTagsWrapper>
      )}
      {/* Rekognition Tags */}
      {detectedLabels && detectedLabels.length > 0 && (
        <MementoTagsWrapper>
          <i class="far fa-eye"></i>
          {detectedLabels.map(result => (
            <MementoTag key={result.name}>
              {result.name.toLowerCase()}{" "}
              <span>{Math.round(result.confidence, 0)}%</span>
            </MementoTag>
          ))}
        </MementoTagsWrapper>
      )}
    </Card>
  );
}
