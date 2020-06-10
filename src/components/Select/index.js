import React from "react";
import { useState } from "react";
import Angle from "./angledown.svg";
import classnames from "classnames";

import "./index.scss";

export default function Select({
  data = "Enter your gender here",
  handleGenderUpdate
}) {
  const [
    showDropdown,
    setDropdown
  ] = useState(false);

  const handleClick = () => {
    setDropdown(!showDropdown);
  };

  const options = [
    { value: "male" },
    { value: "female" }
  ];

  return (
    <div className="select-container">
      <div className="toggle">
        <div className="select-text">
          <p>{data}</p>
          <div
            onClick={handleClick}
            className="click"
          >
            <img
              src={Angle}
              alt="angle"
            />
          </div>
        </div>
        <div
          className={classnames(
            "drop-down",
            { show: showDropdown }
          )}
        >
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => {
                handleGenderUpdate(
                  option.value
                );
                setDropdown(
                  !showDropdown
                );
              }}
              className="option"
            >
              {option.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
