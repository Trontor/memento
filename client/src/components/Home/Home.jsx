import {Background, Bubbles} from "./BubblesStyles";
import {ButtonPrimary, ButtonSecondary} from "ui/Buttons";
import {
  FeatureDescription,
  FeatureImg,
  FeatureTitle,
  FeatureWrapper,
  FeaturesContentWrapper,
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
    image: "https://image.flaticon.com/icons/svg/2219/2219802.svg",
    alt: "family",
    title: "Create or Join Family Groups",
    description: "Invite your closest family members, or even extended family members to a personalised & private space."
  },
  {
    image: "https://image.flaticon.com/icons/svg/2159/2159991.svg",
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
    image: "https://image.flaticon.com/icons/svg/616/616490.svg",
    alt: "bookmark",
    title: "Bookmark and View Later",
    description: "Save your favourite mementos so you can always look back on them anytime and anywhere."
  }
]

let bubbleBackground = (
  <Background>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
    <Bubbles/>
  </Background>
);

export default function Home(props) {
  return (
    <>
      <PageHeader>
        <Logo/>
        <ButtonSecondary onClick={() => props.history.push("/login")}>Login</ButtonSecondary>
      </PageHeader>
      <Intro>
        {bubbleBackground}
        <IntroContent>
          <h1>
            Store your significant memories all in one place.
          </h1>
          <p>
            Memento offers a safe and simple way to preserve your life events, milestones and artefacts for you and your family to appreciate for generations come.
          </p>
          <PitchActions>
            <ButtonPrimary onClick={() => props.history.push("/signup")}>Sign Up</ButtonPrimary>
            <ButtonSecondary>Learn More</ButtonSecondary>
          </PitchActions>
        </IntroContent>
      </Intro>
      <FeaturesOverview>
        <FeaturesContentWrapper>
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
        </FeaturesContentWrapper>
        <PitchActions>
          <ButtonPrimary onClick={() => props.history.push("/signup")}>Get Started</ButtonPrimary>
        </PitchActions>
      </FeaturesOverview>
    </>
  )
}
