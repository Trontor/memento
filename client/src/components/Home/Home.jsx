import {ButtonPrimary, ButtonSecondary} from "ui/Buttons";
import {
  FeaturesOverview,
  Intro,
  IntroContent,
  PageHeader,
  PitchActions
} from './HomeStyles'

import { Logo } from "ui/Logos";
import React from 'react'

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
        
      </FeaturesOverview>
    </>
  )
}
