import { MemberRow } from "./FamilyGroupStyles";
import { useHistory } from "react-router-dom";
import React from "react";

export default function MembersViewer(props) {
  const history = useHistory();
  const { familyId } = props;
  return (
    <>
      {props.members.map(member => {
        const isAdmin = member.familyRoles.some(
          r =>
            r.familyId === familyId && r.familyRole.toLowerCase() === "admin",
        );
        return (
          <MemberRow key={member.firstName} admin={isAdmin}>
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={`${member.firstName}'s avatar`} />
            ) : (
              <i className="fas fa-user-circle"></i>
            )}
            <div>
              <span onClick={() => history.push("/profile/" + member.userId)}>
                {member.firstName} {member.lastName}
              </span>
              {isAdmin && <span>Admin</span>}
            </div>
          </MemberRow>
        );
      })}
    </>
  );
}
