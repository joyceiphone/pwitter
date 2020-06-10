import React from "react";
import StatusCard from "../../components/StatusCard";

import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import "./index.scss";
const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function UserStatus({
  user,
  mainUser,
}) {
  const [posts, setPosts] = useState(
    []
  );
  useEffect(() => {
    const fetchPost = async (index) => {
      const token = window.localStorage.getItem(
        "token"
      );
      if (token && user) {
        const data = await axios.get(
          `${baseUrl}/posts/find/byUser?userId=${user._id}&page=1`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data) {
          console.log(data.data.data);
          setPosts([...data.data.data]);
        }
      }
    };
    fetchPost();
  }, [user]);
  const [
    commentDisplay,
    setCommentDisplay,
  ] = useState({
    currentPost: null,
    isSelected: false,
  });

  const handleCommentDisplay = (
    index
  ) => {
    const nextCommentDisplay = {
      ...commentDisplay,
    };
    nextCommentDisplay.currentPost = index;
    nextCommentDisplay.isSelected = !nextCommentDisplay.isSelected;
    setCommentDisplay(
      nextCommentDisplay
    );
  };

  return (
    <div className="user-status-container">
      {posts &&
        posts.map((post, index) => (
          <StatusCard
            post={post}
            user={user}
            index={index}
            handleCommentDisplay={
              handleCommentDisplay
            }
            commentActive={
              commentDisplay.isSelected
            }
            currentPost={
              commentDisplay.currentPost
            }
          />
        ))}
    </div>
  );
}
