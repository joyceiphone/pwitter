import React, {
  useEffect,
} from "react";

import Add from "./Shape.svg";
import axios from "axios";
import classnames from "classnames";
import check from "./check.svg";
import { useState } from "react";

import "./index.scss";
const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function FriendItem({
  friendList,
  title,
  user,
}) {
  const [
    iconActive,
    setIconActive,
  ] = useState(false);
  const [select, setSelect] = useState(
    null
  );
  const handleFriendAdd = async (
    index,
    id
  ) => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token && user && id) {
      const data = axios.post(
        `${baseUrl}/users/friends/add`,
        {
          userId: user._id,
          friendId: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setIconActive(!iconActive[index]);
    setSelect(index);
  };

  return (
    <div>
      {friendList &&
        friendList.map(
          (friend, index) => (
            <div className="friend-item-container">
              <div className="friend-item-image-text">
                <img
                  src={friend.avatar}
                  alt=""
                />
                <h4>
                  {friend.firstName}{" "}
                  {friend.lastName}
                </h4>
              </div>
              {title ===
              "Friends you may know" ? (
                <div className="friend-item-right-icon">
                  <img
                    onClick={() =>
                      handleFriendAdd(
                        index,
                        friend._id
                      )
                    }
                    className={classnames(
                      {
                        nonActive:
                          index !==
                          select,
                      }
                    )}
                    src={Add}
                    alt="add"
                  />
                  <img
                    src={check}
                    alt="approved"
                    className={classnames(
                      {
                        Active:
                          index ===
                          select,
                      }
                    )}
                  />
                </div>
              ) : null}
            </div>
          )
        )}
    </div>
  );
}
