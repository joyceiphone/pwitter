import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import classnames from "classnames";

import Dropdown from "../Dropdown";

import Oval from "./oval.svg";

import "./index.scss";

export default function Navbar({
  user,
}) {
  const [tab, setTab] = useState(1);
  const handleTabSwitch = (index) => {
    setTab(index);
  };
  const [
    dropDownActive,
    setDropDown,
  ] = useState(false);
  const handleDropdown = () => {
    setDropDown(!dropDownActive);
  };
  return (
    <div className="nav-container">
      <div className="nav-left-container">
        <div className="nav-logo">
          <img src={Oval} alt="logo" />
        </div>
        <div className="nav-items">
          <ul>
            <Link
              to={`/`}
              className="nav-item"
            >
              <li
                className={classnames(
                  "nav-link",
                  {
                    underLine:
                      tab === 1,
                  }
                )}
                onClick={() =>
                  handleTabSwitch(1)
                }
              >
                Home
              </li>
            </Link>
            <Link
              to={`/friends`}
              className="nav-item"
            >
              <li
                className={classnames(
                  "nav-link",
                  {
                    underLine:
                      tab === 2,
                  }
                )}
                onClick={() =>
                  handleTabSwitch(2)
                }
              >
                Friends
              </li>
            </Link>
            <Link
              to={`/profile`}
              className="nav-item"
            >
              <li
                className={classnames(
                  "nav-link",
                  {
                    underLine:
                      tab === 3,
                  }
                )}
                onClick={() =>
                  handleTabSwitch(3)
                }
              >
                Profile
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div
        className="nav-right-container"
        onClick={handleDropdown}
      >
        <div className="user-avatar">
          <img
            src={user.avatar}
            alt="avatar"
          />
        </div>
        <div className="user-name">
          <p>
            {user.firstName +
              " " +
              user.lastName}
          </p>
        </div>
        {dropDownActive && <Dropdown />}
      </div>
    </div>
  );
}
