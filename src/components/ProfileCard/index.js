import React from "react";

import "./index.scss";

export default function ProfileCard({
  title,
  data,
  name,
}) {
  return (
    <div className="profile-card-container">
      <div className="profile-title">
        {title}
      </div>
      <div className="profile-content">
        {name == "Avatar" ? (
          <div className="profile-image">
            <img
              src={data}
              alt="avatar"
            />
          </div>
        ) : (
          <div className="profile-input">
            <p>{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}
