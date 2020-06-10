import React from "react";
import {
  useState,
  useEffect,
} from "react";

import heart from "./heart.svg";
import comment from "./comment.svg";

import Comment from "../Comment";

import "./index.scss";
import axios from "axios";
import classnames from "classnames";

export default function StatusCard({
  post,
  user,
  index,
  handleCommentDisplay,
  commentActive,
  currentPost,
}) {
  const [
    comments,
    setComments,
  ] = useState(post.comments);

  const [value, setValue] = useState(
    ""
  );
  const [
    currentUser,
    setCurrentUser,
  ] = useState({});
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleKeyPress = async (e) => {
    if (e.key == "Enter") {
      const token = window.localStorage.getItem(
        "token"
      );
      if (
        token &&
        user._id &&
        post._id
      ) {
        try {
          console.log(currentUser._id);
          const data = await axios.post(
            "https://pwitterjoyce.herokuapp.com/posts/comment/create",
            {
              authorId: currentUser._id,
              postId: post._id,
              text: value,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
        } catch (error) {
          alert(error.message);
        }
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem(
      "token"
    );
    const fetchLoggedIn = async () => {
      const data = await axios.post(
        "https://pwitterjoyce.herokuapp.com/users/current",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentUser({
        ...data.data.data,
      });
    };
    if (token) {
      fetchLoggedIn();
    }
  }, []);
  console.log(currentUser);

  const handleStatusLike = async () => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token && user._id && post._id) {
      try {
        const data = await axios.post(
          "https://pwitterjoyce.herokuapp.com/posts/like",
          {
            authorId: currentUser._id,
            postId: post._id,
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
    <div className="status-container">
      {post && (
        <div className="status-card-container">
          <div className="status-card-header">
            <div className="avatar-name">
              <div className="status-avatar">
                <img
                  src={user.avatar}
                  alt="avatar"
                />
              </div>
              <div className="status-name">
                <div className="status-name-action">
                  <p>
                    <span>
                      {user.firstName}{" "}
                      {user.lastName}
                    </span>{" "}
                    is feeling{" "}
                    {post.mood}
                  </p>
                </div>
                <div className="status-time">
                  <p>6 hours ago</p>
                </div>
              </div>
            </div>
            <div className="status-text">
              <p>{post.text}</p>
            </div>
            <div className="status-icon">
              <div className="status-heart">
                <img
                  onClick={
                    handleStatusLike
                  }
                  src={heart}
                  alt="heart"
                />
                <span>
                  {post.likes.length}
                </span>
              </div>
              <div className="status-comment-icon">
                <img
                  src={comment}
                  alt="comment-icon"
                />
                <span>
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
          <div className="status-card-body">
            {comments.length > 2 && (
              <div className="comment-title">
                <p
                  onClick={() =>
                    handleCommentDisplay(
                      index
                    )
                  }
                >
                  View prvious comments
                </p>
                {!commentActive && (
                  <p>
                    2 of{" "}
                    {comments.length}
                  </p>
                )}
              </div>
            )}
            <div
              className={classnames(
                "comments-card",
                {
                  show:
                    index ===
                    currentPost,
                }
              )}
            >
              {comments.length > 0 &&
                currentPost == index &&
                commentActive &&
                comments
                  .slice(
                    0,
                    comments.length - 2
                  )
                  .map((comment) => (
                    <Comment
                      id={
                        comment.authorId
                      }
                      text={
                        comment.text
                      }
                    />
                  ))}
              {comments.length > 0 &&
                comments
                  .slice(
                    comments.length - 2
                  )
                  .map(
                    (
                      comment,
                      index
                    ) => (
                      <Comment
                        id={
                          comment.authorId
                        }
                        text={
                          comment.text
                        }
                        user={user}
                      />
                    )
                  )}
              <div className="add-comment">
                <img
                  src={
                    currentUser.avatar
                  }
                  alt="avatar"
                />
                <input
                  value={value}
                  onKeyPress={
                    handleKeyPress
                  }
                  onChange={
                    handleInputChange
                  }
                  type="text"
                  placeholder="Write a comment..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
