import React from "react";
import {
  useState,
  useEffect,
} from "react";

import axios from "axios";
import FriendStatusId from "../../components/FriendStatusId";

import "./index.scss";

const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function MyFriendsStatus({
  user,
}) {
  const [
    friendPosts,
    setPosts,
  ] = useState([]);
  useEffect(() => {
    const fetchFriendsPosts = async () => {
      const token = window.localStorage.getItem(
        "token"
      );
      if (token) {
        const data = await axios.get(
          `${baseUrl}/posts/find/byFriend?userId=${user._id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.success) {
          setPosts([...data.data.data]);
        }
      }
    };
    fetchFriendsPosts();
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
    <div className="friend-status-container">
      {friendPosts.map(
        (post, index) => (
          <FriendStatusId
            post={post}
            id={post.authorId}
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
        )
      )}
    </div>
  );
}
