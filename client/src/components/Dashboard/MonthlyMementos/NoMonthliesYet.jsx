import { NoMonthliesWrapper } from "./MonthlyMementoStyles";
import React from 'react'
import { TextWrapper } from "components/Dashboard/NewUser/NewUserStyles";

export default function NoMonthliesYet(props) {
  return (
    <NoMonthliesWrapper>
      <i class="fas fa-landmark"></i>
      <h2>Welp. No {props.currentMonth} Mementos yet.</h2>
      <p>There's nothing here because no one in your family has ever, in history of this Earth, shared a memento belonging to the month of {props.currentMonth}.</p>
      <p>Why not be the first to share a memory of {props.currentMonth}?</p>
    </NoMonthliesWrapper>
  )
}
