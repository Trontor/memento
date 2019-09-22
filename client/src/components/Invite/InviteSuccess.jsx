import React from "react";

export default function InviteSuccess({ results }) {
  return (
    <div>
      {results.sent.map(email => (
        <h1>{email} sent succesfully</h1>
      ))}
      {results.failed.map(({ email, error }) => (
        <h1>
          {email} failed to send with error: {error}
        </h1>
      ))}
    </div>
  );
}
