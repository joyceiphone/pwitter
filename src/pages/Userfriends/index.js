import React from "react";
import {
  useState,
  useEffect,
} from "react";
import Banner from "../../components/Banner";
import axios from "axios";

import FriendCard from "../../components/FriendCard";

import "./index.scss";
const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function Userfriends({
  user,
}) {
  const [
    userFriendLists,
    setUserFriendList,
  ] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem(
      "token"
    );
    const fetchUserFriends = async () => {
      const data = await axios.get(
        `${baseUrl}/users/find/byId?userId=${user._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUserFriendList(
        data.data.data.friends
      );
    };
    if (token) {
      fetchUserFriends();
    }
  }, [user]);
  console.log(userFriendLists);

  return (
    <div className="user-friends-page-container">
      <div className="card-container">
        <div className="card-head">
          <Banner text="My Friends" />
        </div>
        <div className="card-body">
          {userFriendLists &&
            userFriendLists.map(
              (friend) =>
                friend && (
                  <FriendCard
                    id={friend}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
}
