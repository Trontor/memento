import { AcceptFieldWrapper, InvitationWrapper } from "./AcceptInviteStyles";
import React, { useState } from "react";

import { ButtonPrimary } from "ui/Buttons";
import { Container } from "ui/Helpers";
import { InputField } from "ui/Forms";
import { TextWrapper } from "components/Dashboard/NewUser/NewUserStyles";

export default function InviteCode(props) {
  const [inviteId, setInviteId] = useState("");

  const handleAcceptClick = () => {
    props.history.push("/invite/accept/" + inviteId);
  };
  return (
    <Container>
      <TextWrapper>
        <InvitationWrapper>
          <i class="far fa-envelope-open"></i>
          <h2>Join your Family today!</h2>
          <p>Got an invitation code?</p>
          <p>Enter it below to accept your invitation:</p>
          <AcceptFieldWrapper>
            <InputField
              value={inviteId}
              onChange={e => setInviteId(e.target.value)}
              placeholder="Invitation Code"
            />
          </AcceptFieldWrapper>
          <ButtonPrimary onClick={handleAcceptClick} disabled={!inviteId}>
            Accept
          </ButtonPrimary>
        </InvitationWrapper>
      </TextWrapper>
    </Container>
  );
}
