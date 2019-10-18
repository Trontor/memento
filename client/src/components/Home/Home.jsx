import {ButtonPrimary, ButtonSecondary} from "ui/Buttons";
import {
  FeatureDescription,
  FeatureImg,
  FeatureTitle,
  FeatureWrapper,
  FeaturesOverview,
  Intro,
  IntroContent,
  PageHeader,
  PitchActions
} from './HomeStyles'

import { Logo } from "ui/Logos";
import React from 'react'

const features = [
  {
    image: "https://image.flaticon.com/icons/svg/1999/1999109.svg",
    alt: "family",
    title: "Create or Join Family Groups",
    description: "Invite your closest family members, or even extended family members to your personalised & private space."
  },
  {
    image: "https://image.flaticon.com/icons/svg/2157/2157436.svg",
    alt: "archive",
    title: "Collate and Archive",
    description: "Store your most important milestones, events, and artefacts all in one place."
  },
  {
    image: "https://image.flaticon.com/icons/svg/461/461352.svg",
    alt: "tags",
    title: "Tag and Organise",
    description: "Create your own tags for your mementos, or let our Norton Vision handle it for you."
  },
  {
    image: "https://img.icons8.com/cute-clipart/256/000000/bookmark-ribbon.png",
    alt: "bookmark",
    title: "Bookmark and View Later",
    description: "Save your favourite mementos so you can always look back on them anytime and anywhere."
  }
]

export default function Home() {
  return (
    <>
      <PageHeader>
        <Logo/>
        <ButtonSecondary>Login</ButtonSecondary>
      </PageHeader>
      <Intro>
        <IntroContent>
          <h1>
            Store your most significant memories in one place.
          </h1>
          <p>
            Memento offers a safe and simple way to preserve your life events, milestones and artefacts for you and your family to appreciate for generations come.
          </p>
          <PitchActions>
            <ButtonPrimary>Get Started</ButtonPrimary>
            <ButtonSecondary>Learn More</ButtonSecondary>
          </PitchActions>
        </IntroContent>
      </Intro>
      <FeaturesOverview>
      {features.map(feature => (
        <FeatureWrapper>
          <FeatureImg>
            <img src={feature.image} alt={feature.alt}/>
          </FeatureImg>
          <div>
            <FeatureTitle>
              {feature.title}
            </FeatureTitle>
            <FeatureDescription>
              {feature.description}
            </FeatureDescription>
          </div>
        </FeatureWrapper>
      ))}
      </FeaturesOverview>
    </>
  )
}
