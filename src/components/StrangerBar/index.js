import React from "react";
import {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import classnames from "classnames";
import FriendItem from "../../components/FriendItem";

const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function StrangerBar({
  user,
  title,
}) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let strangerPageIds = [];
  const [
    strangerList,
    setStrangerList,
  ] = useState([]);

  const handleStrangerPageSwitch = async (
    index
  ) => {
    const token = window.localStorage.getItem(
      "token"
    );
    if (token && user) {
      const data = await axios.get(
        `${baseUrl}/users/strangers/byId?userId=${
          user._id
        }&page=${page - 1}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setStrangerList(
          data.data.data.data
        );
        setTotal(data.data.data.total);
      }
    }
    setPage(index);
  };

  useEffect(() => {
    handleStrangerPageSwitch(1);
  }, [user]);
  for (
    let i = 1;
    i <= Math.floor(total / 7) + 1;
    i++
  ) {
    strangerPageIds.push(i);
  }

  return (
    <div className="left-bar-container">
      <div className="left-bar-title">
        <h4>{title}</h4>
      </div>
      <div className="left-bar-body">
        <div className="left-bar-card">
          <FriendItem
            friendList={strangerList}
            title={title}
            user={user}
          />
        </div>
      </div>
      {strangerPageIds.length > 1 && (
        <div className="left-bar-card-footer">
          {strangerPageIds.map(
            (strangerPageId, index) => (
              <div
                key={index}
                className={classnames(
                  "footer-number",
                  {
                    changeColor:
                      page ===
                      strangerPageId,
                  }
                )}
                onClick={() =>
                  handleStrangerPageSwitch(
                    strangerPageId
                  )
                }
              >
                {strangerPageId}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
