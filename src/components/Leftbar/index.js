import React, {
  useEffect,
} from "react";
import { useState } from "react";
import classnames from "classnames";

import "./index.scss";
import FriendItem from "../../components/FriendItem";
import axios from "axios";

const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function LeftbarRoute({
  user,
  title,
  total,
}) {
  let friendPageIds = [];
  const [
    friendList1,
    setFriendList,
  ] = useState([]);

  for (
    let i = 1;
    i <= Math.floor(total / 7) + 1;
    i++
  ) {
    friendPageIds.push(i);
  }

  const [page, setPage] = useState(1);

  const handleFriendPageSwitch = async (
    index
  ) => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token && user) {
      const data = await axios.get(
        `${baseUrl}/users/friends/byId?userId=${user._id}&page=${index}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setFriendList(
          data.data.data.data
        );
      }
    }
    setPage(index);
  };

  useEffect(() => {
    handleFriendPageSwitch(1);
  }, [user]);

  console.log(friendList1);

  return (
    <div className="left-bar-container">
      <div className="left-bar-title">
        <h4>{title}</h4>
      </div>
      <div className="left-bar-body">
        <div
          key={1}
          className="left-bar-card"
        >
          <FriendItem
            friendList={friendList1}
          />
        </div>
      </div>
      {friendPageIds.length > 1 && (
        <div className="left-bar-card-footer">
          {friendPageIds.map(
            (friendPageId, index) => (
              <div
                key={index}
                className={classnames(
                  "footer-number",
                  {
                    changeColor:
                      page ===
                      friendPageId,
                  }
                )}
                onClick={() =>
                  handleFriendPageSwitch(
                    friendPageId
                  )
                }
              >
                {friendPageId}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
