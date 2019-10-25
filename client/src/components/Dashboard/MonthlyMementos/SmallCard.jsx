// import { ADD_BOOKMARK, DELETE_BOOKMARK } from "mutations/Memento";
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
  MementoTitle,
  PeopleTags,
} from "./SmallCardStyles";
import React, { useState } from "react";

// import InheritanceTree from "components/InheritanceTree/InheritanceTree";
import moment from "moment";
import { useHistory } from "react-router";
// import { useMutation } from "@apollo/react-hooks";

export default function SmallCard(props) {
  const history = useHistory();
  const {
    userId,
    mementoId,
    // createdAt,
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
    // bookmarkedBy,
    beneficiaries,
    uploader,
    people,
    // onBookmarkToggled,
  } = props;
  const [showInheritanceTree, setShowInheritanceTree] = useState(false);

  // const [bookmark] = useMutation(ADD_BOOKMARK, {
  //   variables: { id: mementoId },
  //   onCompleted: data => {
  //     onBookmarkToggled();
  //   },
  // });

  // const [removeBookmark] = useMutation(DELETE_BOOKMARK, {
  //   variables: { id: mementoId },
  //   onCompleted: data => {
  //     onBookmarkToggled();
  //   },
  // });

  // const isBookmarked = bookmarkedBy.some(id => id.userId === userId);

  const isUploader = uploader.userId === userId;

  const mementoDate = moment(
    dates[0].day.toString().padStart(2, "0") +
      "/" +
      dates[0].month.toString().padStart(2, "0") +
      "/" +
      dates[0].year,
    "DD-MM-YYYY",
  ).format("Do  MMM YYYY");

  console.log(family);

  return (
    <Card>
      {props.media.length > 0 && (
        <MementoCoverImg>
          <img alt={props.caption} src={props.media[0].url} />
        </MementoCoverImg>
      )}
      <CardContent>
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
            <span>{family.name}</span>
          </div>
          {/* Edit & Bookmark */}
          <CardOptions>
            {false && beneficiaries && beneficiaries.length > 0 && (
              <i
                className="fas fa-sitemap"
                onClick={() => setShowInheritanceTree(!showInheritanceTree)}
              />
            )}
            {isUploader && detectedLabels.length > 0 && (
              <i
                className="fas fa-eye"
                onClick={() =>
                  history.push("/memento/" + mementoId + "/vision")
                }
              />
            )}
            {isUploader && (
              <i
                className="fas fa-pencil-alt"
                onClick={() => history.push("/memento/" + mementoId + "/edit")}
              />
            )}
            <i
              class="fas fa-link"
              onClick={() => history.push("/memento/" + mementoId)}
            ></i>
            {/* <i
              className={(isBookmarked ? "fas" : "far") + " fa-bookmark"}
              onClick={() => (isBookmarked ? removeBookmark() : bookmark())}
            ></i> */}
          </CardOptions>
        </AuthorWrapper>
        <MementoInfo>
          {/* Title */}
          <MementoTitle>{title}</MementoTitle>
          <MementoOverview familyColour={family.colour}>
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
                <div>
                  {props.people.map(person => (
                    <PeopleTags key={person.firstName}>
                      {person.firstName} {person.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
          </MementoOverview>

          {/* Description */}
          <MementoDescription>{description}</MementoDescription>
        </MementoInfo>
      </CardContent>
    </Card>
  );
}
