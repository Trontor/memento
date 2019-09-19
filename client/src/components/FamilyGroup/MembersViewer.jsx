import React from "react";

export default function MembersViewer(props) {

  return (
    <>
      {props.members.map(member => (
        <h1>
          {member.firstName} {member.lastName}
        </h1>
      ))}
    </>
  );
}
