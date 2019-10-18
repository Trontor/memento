import { MemberRow } from "./FamilyGroupStyles";
import React from "react";

export default function MembersViewer(props) {
  return (
    <>
      {props.members.map(member => (
        <MemberRow admin>
          <i className="fas fa-user-circle"></i>
          <div>
            <span
              onClick={() => props.history.push("/profile/" + member.userId)}
            >
              {member.firstName} {member.lastName}
            </span>
            <span>Admin</span>
          </div>
        </MemberRow>
      ))}
    </>
  );
}
