import React from "react";
import {
  useState,
  useEffect,
} from "react";
import axios from "axios";

import emoji from "./emoji.svg";

import "./index.scss";
const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function Comment({
  id,
  text,
  user,
}) {
  const [author, setAuthor] = useState(
    {}
  );
  useEffect(() => {
    const fetchAuthor = async () => {
      const token = window.localStorage.getItem(
        "token"
      );
      if (token && id) {
        const data = await axios.get(
          `${baseUrl}/users/find/byId?userId=${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data.data.data);
        setAuthor({
          ...data.data.data,
        });
      }
    };
    fetchAuthor();
  }, [user]);
  console.log(author);

  return (
    <div>
      {author && (
        <div className="comment-container">
          <div className="comment-image">
            <img
              src={author.avatar}
              alt="avatar"
            />
          </div>
          <div className="comment-text">
            <div className="comment-name-text">
              <h4>
                {author.lastName}{" "}
                {author.firstName}
              </h4>
              <p>{text}</p>
            </div>
            <div className="comment-like">
              <p>Like</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
