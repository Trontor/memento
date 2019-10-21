import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ACCEPT_INVITE } from "mutations/Invite";
import JollyLoader from "components/JollyLoader/JollyLoader";

const ERROR_INVITE_NOT_FOUND = "Invite not found";
const ERROR_ALREADY_JOINED_FAMILY = "Already joined family";

export default function AcceptInvite(props) {
  const inviteId = props.match.params.inviteId;
  const [acceptInvite, { data, loading, error }] = useMutation(ACCEPT_INVITE);
  // Check if there is a user currently logged in
  if (!localStorage.getItem("AUTH-TOKEN")) {
    localStorage.setItem("PENDING-INVITE", inviteId);
    props.history.push("/login");
  }

  useEffect(() => {
    acceptInvite({ variables: { input: { inviteId } } });
  }, [acceptInvite, inviteId]);

  if (data && data.joinFamily) {
    const familyId = data.joinFamily.familyId;
    props.history.push("/family/" + familyId);
  }
  if (loading) {
    return <JollyLoader quotes={["Reedeeming invite..."]} />;
  }
  // GraphQL Error
  if (error && error.graphQLErrors) {
    const errorMessage = error.graphQLErrors[0].message.message;
    console.error(errorMessage);
    switch (errorMessage) {
      case ERROR_INVITE_NOT_FOUND:
        return "Invite not found";
      case ERROR_ALREADY_JOINED_FAMILY:
        return "Already joined the family...";
      default:
        return "Unknown error";
    }
  }
  return <div>{inviteId}</div>;
}
