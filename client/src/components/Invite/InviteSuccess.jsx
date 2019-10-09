import {
  ButtonMenu,
  Email,
  EmailsList,
  SentMessage,
  TextWrapper,
} from "./InviteSuccessStyles.js";
import { ButtonPrimary, ButtonSecondary } from "ui/Buttons";

import { Container } from "ui/Helpers";
import React from "react";
import { useHistory } from "react-router-dom";

export default function InviteSuccess({ results }) {
  const history = useHistory();
  return (
    <Container>
      <TextWrapper>
        <i class="fas fa-paper-plane"></i>
        {results.sent.length > 0 && (
          <SentMessage>
            <p>Invitations were sent to the following email addresses:</p>
            <EmailsList>
              {results.sent.map(email => (
                <>
                  <i class="fas fa-smile"></i>
                  <Email>{email}</Email>
                </>
              ))}
            </EmailsList>
          </SentMessage>
        )}
        {results.failed.length > 0 && (
          <SentMessage>
            <p>Invitations were not sent to the following email addresses:</p>
            <EmailsList failure>
              {results.failed.map(({ email, error }) => (
                <>
                  <i class="far fa-frown"></i>
                  <div>
                    <Email>{email}</Email>
                    <p>{error}</p>
                  </div>
                </>
              ))}
            </EmailsList>
          </SentMessage>
        )}
        <ButtonMenu>
          <ButtonPrimary onClick={() => history.push("/dashboard")}>
            Go to Dashboard
          </ButtonPrimary>
          <ButtonSecondary onClick={() => history.push("/invite")}>
            Invite More People
          </ButtonSecondary>
        </ButtonMenu>
      </TextWrapper>
    </Container>
  );
}
