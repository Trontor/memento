import { ActivityIndicator, MemberRow } from "./FamilyGroupStyles";

import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

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

        const now = moment(); //todays date
        const lastActive = moment.duration(now.diff(member.lastSeenAt));
        const isActive = lastActive.asMinutes() < 2;
        // if (isActive) {
        //   console.log(
        //     `${
        //       member.firstName
        //     } was active ${lastActive.asSeconds()} seconds ago`,
        //   );
        // }
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
            {isActive && (
              <ActivityIndicator/>
            )}
          </MemberRow>
        );
      })}
    </>
  );
}
