import React from "react";
import { Wrapper } from "ui/Helpers";

export default function MembersViewer(props) {

  return (
    <Wrapper>
      {props.members.map(member => (
        <h1>
          {member.firstName} {member.lastName}
        </h1>
      ))}
    </Wrapper>
  );
}
