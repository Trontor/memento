import { ButtonPrimaryLight } from "ui/Buttons";
import { PageSpinnerWrapper } from "ui/Loaders";
import React from "react";
import { SadError } from "./JollyErrorStyles";

const errorEmojis = ["far fa-flushed", "fas fa-tired", "far fa-dizzy"];

/**
 * The JollyError component renders a component for when data
 * fails to load.
 */
export default function JollyError(props) {
  let error = props.error || "An error occurred x_x";

  return (
    <PageSpinnerWrapper>
      <SadError>
        {errorEmojis.map(emoji => (
           <i className={emoji}></i>
        ))}
        <p>{error}</p>
      </SadError>
      <ButtonPrimaryLight onCLick={() => window.location.reload(false)}>Click to Reload</ButtonPrimaryLight>
    </PageSpinnerWrapper>
  );
}
