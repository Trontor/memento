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
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/react-hooks";
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
    detectedLabels,
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
        {/* Cover Image
        {props.media.length > 0 && (
          <MementoCoverImg
            onClick={() => history.push("/memento/" + mementoId)}
          >
            <img alt={props.caption} src={props.media[0].url} />
          </MementoCoverImg>
        )} */}

        {/* Cover Image */}
        {showInheritanceTree && beneficiaries.length > 0 ? (
          <InheritanceTree width="100%" height="400px" mementoId={mementoId} />
        ) : (
          props.media.length > 0 && (
            <MementoCoverImg
              onClick={() => history.push("/memento/" + mementoId)}
            >
              <img alt={props.caption} src={props.media[0].url} />
            </MementoCoverImg>
          )
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
            {beneficiaries && beneficiaries.length > 0 && (
              <i
                className="fas fa-sitemap"
                onClick={() => setShowInheritanceTree(!showInheritanceTree)}
              />
            )}
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

        {/* Rekognition Tags */}
        {detectedLabels && detectedLabels.length > 0 && (
          <MementoTagsWrapper familyColour={family.colour}>
            <i class="far fa-eye"></i>
            {detectedLabels.map(result => (
              <MementoTag key={result.name} familyColour={family.colour}>
                {result.name.toLowerCase()}{" "}
                <span>{Math.round(result.confidence, 0)}%</span>
              </MementoTag>
            ))}
          </MementoTagsWrapper>
        )}
      </CardInfo>
    </Card>
  );
}
