import React, { useState } from "react";
import { Container, CenterText } from "ui/Helpers";
import { Header } from "ui/Typography";
import { InputField } from "ui/Forms";
import { ButtonPrimary } from "ui/Buttons";

export default function InviteCode(props) {
  const [inviteId, setInviteId] = useState("");

  const handleAcceptClick = () => {
    props.history.push("/invite/accept/" + inviteId);
  };
  return (
    <Container>
      <CenterText>
        <Header underline>Accept Invite</Header>
        <div>
          <InputField
            style={{
              textAlign: "center",
              maxWidth: "250px",
              marginBottom: "10px",
            }}
            value={inviteId}
            onChange={e => setInviteId(e.target.value)}
            placeholder="Invitation Code"
          ></InputField>
        </div>
        <ButtonPrimary onClick={handleAcceptClick}>Accept</ButtonPrimary>
      </CenterText>
    </Container>
  );
}
