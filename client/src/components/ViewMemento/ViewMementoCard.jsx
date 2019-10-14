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
  UploadDate,
} from "../MementoCard/MementoCardStyles";
import { useHistory } from "react-router";
import { List } from "ui/Radio";
import React from "react";
import {
  Card,
  CardInfo,
  InfoWrapper,
  ListText,
  CardContent,
  FamilyGroup,
} from "./ViewMementoStyles";

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
            <FamilyGroup>Valerie's Family</FamilyGroup>
          </div>
          {/* Edit & Bookmark */}
          <CardOptions>
            <i class="far fa-bookmark"></i>
          </CardOptions>
        </AuthorWrapper>
        {/* Title */}
        <MementoTitle>Title</MementoTitle>
        <MementoOverview>
          <span>
            <i class="far fa-clock" />
            {dates[0].year}
          </span>
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
        </MementoOverview>

        {/* Description */}
        <MementoDescription>{props.description}</MementoDescription>

        <MementoTagsWrapper>
          <ListText>
            <List size="20px" />
            Tags
          </ListText>
        </MementoTagsWrapper>
      </CardInfo>
      <CardContent>
        {/* Cover Image */}
        {props.media.length > 0 && (
          <MementoCoverImg>
            <img alt={props.caption} src={props.media[0].url} />
          </MementoCoverImg>
        )}
        <MementoDescription>
          This is a caption of the image. Some images will have captions. Some
          may not
        </MementoDescription>
      </CardContent>
    </Card>
  );
}
