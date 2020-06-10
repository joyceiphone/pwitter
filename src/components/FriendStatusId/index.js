import React from "react";
import {
  useState,
  useEffect,
} from "react";
import axios from "axios";

import StatusCard from "../../components/StatusCard";

const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function FriendStatusId({
  post,
  id,
  user,
  index,
  handleCommentDisplay,
  commentActive,
  currentPost,
}) {
  const [author, setAuthor] = useState(
    {}
  );
  useEffect(() => {
    const fetchFriendInfo = async () => {
      const token = window.localStorage.getItem(
        "token"
      );
      if (token) {
        const data = await axios.get(
          `${baseUrl}/users/find/byId?userId=${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data) {
          setAuthor({
            ...data.data.data,
          });
        }
      }
    };
    fetchFriendInfo();
  }, [user]);
  return (
    <StatusCard
      post={post}
      user={author}
      index={index}
      handleCommentDisplay={
        handleCommentDisplay
      }
      commentActive={commentActive}
      currentPost={currentPost}
    />
  );
}
