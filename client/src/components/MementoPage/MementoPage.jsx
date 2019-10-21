import {
  AuthorAvatar,
  AuthorWrapper,
  CardContent,
  CardOptions,
  MementoAuthor,
  MementoDescription,
  MementoOverview,
  PeopleTags,
  UploadDate
} from "components/MementoCard/MementoCardStyles";
import {
  BackButtonDiv,
  Card,
  LargerTag,
  MementoImg,
  TagSectionWrapper,
  TagsWrapper
} from "./MementoPageStyles";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { BackButton } from "ui/Navigation";
import { Container } from "ui/Helpers";
import { GET_A_MEMENTO } from "queries/Memento";
import JollyLoader from "components/JollyLoader/JollyLoader";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";

export default function MementoPage() {
  /** Hooks */
  const history = useHistory();
  const { mementoId } = useParams();
  const [memento, setMemento] = useState(null);
  // Load the memento data
  useQuery(GET_A_MEMENTO, {
    variables: { id: mementoId },
    onCompleted: data => {
      if (data && data.memento) setMemento(data.memento);
    },
  });


  /** Loading/Error state management */
  if (!memento) {
    return <JollyLoader />;
  }

  const mementoDate = moment(
    memento.dates[0].day.toString().padStart(2, "0") +
      "/" +
    memento.dates[0].month.toString().padStart(2, "0") +
    "/" +
    memento.dates[0].year,
    "DD-MM-YYYY",
  ).format("Do  MMM YYYY");

  const createdDate = new Date(memento.createdAt);

  /** Business Logic */

  return (
    <Container>
      <BackButtonDiv onClick={()=> history.push("/family/" + memento.family.familyId)}>
        <BackButton>
        </BackButton>
        <span>Back</span>
      </BackButtonDiv>
      <Card>
        {
          memento.media.length > 0 && (
            <MementoImg>
              <img alt={memento.media.caption} src={memento.media[0].url} />
            </MementoImg>
          )
        }
        <CardContent>
          <AuthorWrapper>
            <AuthorAvatar>
              {!memento.uploader.imageUrl ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img src={memento.uploader.imageUrl} alt={memento.uploader.firstName} />
              )}
            </AuthorAvatar>
            <div>
              <MementoAuthor>
                {memento.uploader.firstName + " " + memento.uploader.lastName}
              </MementoAuthor>
              <UploadDate>
                {moment(createdDate.toLocaleDateString(), "DD-MM-YYYY").fromNow()}
              </UploadDate>
            </div>
            {/* Edit & Bookmark */}
            <CardOptions>
              {memento.beneficiaries && memento.beneficiaries.length > 0 && (
                <i
                  className="fas fa-sitemap"
                />
              )}
              <i
                className="fas fa-pencil-alt"
                onClick={() => history.push("/memento/" + mementoId + "/edit")}
              />
              <i className="fas fa-link"
                onClick={()=> history.push("/memento/" + mementoId)}
              />
            </CardOptions>
          </AuthorWrapper>
          <h1>
            {memento.title}
          </h1>
          <MementoOverview page>
             {/* Date */}
             <span>
              <i className="far fa-clock"></i>
              {mementoDate}
            </span>
            {/* Location */}
            {memento.location && (
              <span>
                <i className="fas fa-map-marker-alt"></i>
                {memento.location}
              </span>
            )}
            {/* People Tags */}
            {memento.people && memento.people.length > 0 && (
              <span>
                <i className="fas fa-user-tag"></i>
                <div>
                  {memento.people.map(person => (
                    <PeopleTags key={person.firstName}>
                      {person.firstName} {person.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
            {/* Beneficiary Tags */}
            {memento.beneficiaries && memento.beneficiaries.length > 0 && (
              <span>
                <i class="far fa-handshake"></i>
                <div>
                  {memento.beneficiaries.map(beneficiary => (
                    <PeopleTags key={beneficiary.firstName}>
                      {beneficiary.firstName} {beneficiary.lastName}
                    </PeopleTags>
                  ))}
                </div>
              </span>
            )}
            </MementoOverview>
            <MementoDescription>
              {memento.description}
            </MementoDescription>

            {/* Tags */}
            <TagsWrapper>
              {memento.tags && memento.tags.length > 0 && (
                <TagSectionWrapper familyColour={memento.family.colour}>
                  <i class="fas fa-tags"></i>
                  {memento.tags.map(tag => (
                    <LargerTag familyColour={memento.family.colour}>{tag}</LargerTag>
                  ))}
                </TagSectionWrapper>
              )}
              {/* Rekognition Tags */}
              {memento.detectedLabels && memento.detectedLabels.length > 0 && (
                <TagSectionWrapper familyColour={memento.family.colour}>
                  <i class="far fa-eye"></i>
                  {memento.detectedLabels.map(result => (
                    <LargerTag key={result.name} familyColour={memento.family.colour}>
                      {result.name.toLowerCase()}{" "}
                      <span>{Math.round(result.confidence, 0)}%</span>
                    </LargerTag>
                  ))}
                </TagSectionWrapper>
              )}
            </TagsWrapper>
        </CardContent>
      </Card>
    </Container>
  );
}
