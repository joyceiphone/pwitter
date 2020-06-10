import React from "react";
import classnames from "classnames";

import "./index.scss";

export default function Banner({
  text
}) {
  return (
    <div className="banner-container">
      <div className="banner-text">
        <h4>{text}</h4>
      </div>
      <div
        className={classnames(
          "banner-search-bar",
          {
            searchbarActive:
              text == "My Friends"
          }
        )}
      >
        <input
          type="text"
          placeholder="Search for friends"
        />
      </div>
    </div>
  );
}
