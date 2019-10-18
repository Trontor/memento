import {ButtonSecondary} from "ui/Buttons";
import { Logo } from "ui/Logos";
import {PageHeader} from './HomeStyles'
import React from 'react'

export default function Home() {
  return (
    <>
      <PageHeader>
        <Logo/>
        <ButtonSecondary>
          Login
        </ButtonSecondary>
      </PageHeader>
    </>
  )
}
