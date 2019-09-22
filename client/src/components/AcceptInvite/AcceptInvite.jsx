import React from "react";

export default function AcceptInvite(props) {
  const inviteID = props.match.params.inviteId;
  return <div>{inviteID}</div>;
}
