import React, { useEffect, useState } from "react";

import { PageSpinnerWrapper } from "ui/Loaders";
import { SadError } from "./JollyErrorStyles";

let usedErrors = [];

const errorEmojis = ["far fa-flushed", "far fa-dizzy", "fas fa-tired"];

/**
 *
 *
 */
export default function JollyError(props) {
  let errors = props.errors || ["Error"];
  // const [errorMsg, setErrorMsg] = useState(errors[0]);

  // useEffect(() => {
  //   const tick = () => {
  //     if (usedErrors.length === errors.length) usedErrors = [];
  //     let randomErrorMsg;
  //     do {
  //       randomErrorMsg = errors[Math.floor(Math.random() * errors.length)];
  //     } while (usedErrors.includes(randomError));
  //     usedErrors.push(randomError);
  //     setError(randomErrorMsg);
  //   };
  //   const id = setInterval(tick, 2500);
  //   return () => clearInterval(id);
  // }, [currentError, errors]);

  return (
    <PageSpinnerWrapper>
      <SadError>
        <i class="fas fa-tired"></i>
        {/* {currentMsg} */}
      </SadError>
    </PageSpinnerWrapper>
  );
}
