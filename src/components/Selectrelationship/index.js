import React from "react";
import { useState } from "react";
import Angle from "./angledown.svg";
import classnames from "classnames";

import "./index.scss";

export default function Selectrelationship({
  data,
  handleRelationshipUpdate,
}) {
  const options = [
    { value: "In a relationship" },
    { value: "Single" },
  ];
  const [
    showDropdown,
    setDropdown,
  ] = useState(false);

  const handleClick = () => {
    setDropdown(!showDropdown);
  };

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
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                handleRelationshipUpdate(
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
