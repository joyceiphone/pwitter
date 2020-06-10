import React from "react";

import "./index.scss";
import {
  Redirect,
  Link,
} from "react-router-dom";

export default function Dropdown({
  history,
}) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    return <Redirect to="/login" />;
  };
  return (
    <div className="drop-down-container">
      <div className="drop-down-profile drop-down-item">
        <Link
          className="profile-link"
          to="/profile"
        >
          <h5>Profile</h5>
        </Link>
      </div>
      <div className="drop-down-setting drop-down-item">
        <Link
          className="setting-link"
          to="/setting"
        >
          <h5>Setting</h5>
        </Link>
      </div>
      <div
        className="drop-down-logout drop-down-item"
        onClick={() =>
          handleLogout(history)
        }
      >
        <h5>Log Out</h5>
      </div>
    </div>
  );
}
