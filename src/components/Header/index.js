import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useState } from "react";

import "./index.scss";

export default function Header({
  user,
}) {
  const [tab, setTab] = useState(1);
  const handleTabSwitch = (index) => {
    setTab(index);
  };
  return (
    <div className="header-container">
      {user && (
        <div className="header-image-text-container">
          <div className="header-image">
            <img
              src={user.avatar}
              alt="header-avatar"
            />
          </div>
          <div>
            <div className="header-text">
              <div className="header-user-name">
                <h4>
                  {user.firstName}{" "}
                  {user.lastName}
                </h4>
              </div>
              <div className="header-links">
                <Link
                  className={classnames(
                    "header-link",
                    {
                      changeColor:
                        tab === 1,
                    }
                  )}
                  to={`../${user._id}/status`}
                  onClick={() =>
                    handleTabSwitch(1)
                  }
                >
                  Status
                </Link>
                <Link
                  className={classnames(
                    "header-link",
                    {
                      changeColor:
                        tab === 2,
                    }
                  )}
                  to={`../${user._id}/profile`}
                  onClick={() =>
                    handleTabSwitch(2)
                  }
                >
                  Profile
                </Link>
                <Link
                  className={classnames(
                    "header-link",
                    {
                      changeColor:
                        tab === 3,
                    }
                  )}
                  to={`../${user._id}/friends`}
                  onClick={() =>
                    handleTabSwitch(3)
                  }
                >
                  Friends
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
