import React from "react";
import { Link } from "react-router-dom";

export default function FollowSequence(props) {
  return (
    <div className="user-name-page">
      {props.userHistory.map((user, index) => {
        return (
          <div key={user.id} style={{ display: "inline-block" }}>
            <Link to={`/user/${user.id}`}>{user.fullName}</Link>
            {props.userHistory.length - 1 !== index && (
              <i style={{ margin: "0 4px" }}>{">"}</i>
            )}
          </div>
        );
      })}
    </div>
  );
}
