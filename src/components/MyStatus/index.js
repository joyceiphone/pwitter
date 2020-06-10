import React from "react";
import { useState } from "react";
import axios from "axios";

import emoji from "./emoji.svg";

import "./index.scss";

export default function MyStatus({
  user,
}) {
  const [value, setValue] = useState(
    ""
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleInputPost = async () => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token && user._id) {
      try {
        const data = await axios.post(
          "https://pwitterjoyce.herokuapp.com/posts/create",
          {
            text: value,
            mood: "happy",
            authorId: user._id,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <div className="my-status-container">
      <div className="my-status-body">
        <div className="my-status-title">
          <h5>Status</h5>
        </div>
        <div className="my-status-image-text">
          <img
            src={user.avatar}
            alt="avatar"
          />
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={`What is on your mind, ${user.firstName}?`}
          />
        </div>
        <div className="my-status-footer">
          <div className="emoji-mood">
            <img src={emoji} alt="" />
            <h5>Mood</h5>
          </div>
          <button
            onClick={handleInputPost}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
