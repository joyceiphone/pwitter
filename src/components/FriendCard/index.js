import React from "react";
import {
  Link,
  Redirect,
} from "react-router-dom";
import {
  useState,
  useEffect,
} from "react";

import iconx from "./iconx.svg";

import "./index.scss";
import axios from "axios";
const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function FriendCard({
  id,
  user,
}) {
  const [friend, setFriend] = useState(
    {}
  );
  const [
    friendTotal,
    setTotal,
  ] = useState(0);
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
          setFriend({
            ...data.data.data,
          });
          setTotal(
            data.data.data.friends
              .length
          );
        }
      }
    };
    fetchFriendInfo();
  }, [user]);

  const handleFriendsPage = () => {
    window.location.reload();
  };
  return (
    <div className="friend-card-container">
      <div className="friend-card-image">
        <img
          src={friend.avatar}
          alt="friendimage"
        />
      </div>
      <div
        className="friend-card-text"
        onClick={() =>
          handleFriendsPage()
        }
      >
        <Link to={`../../${id}`}>
          <h4>
            {friend.firstName}{" "}
            {friend.lastName}
          </h4>
          <h5>{friendTotal}</h5>
        </Link>
      </div>
      <div className="friend-card-toggle">
        <img
          src={iconx}
          alt="delete-friend"
        />
      </div>
    </div>
  );
}
