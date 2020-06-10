import React from "react";
import {
  useState,
  useEffect,
} from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";

import FriendCard from "../../components/FriendCard";
import axios from "axios";

const baseUrl =
  "https://pwitterjoyce.herokuapp.com";

export default function Userfriends({
  user,
}) {
  const [
    friendLists1,
    setFriendsLists,
  ] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem(
      "token"
    );
    const fetchFriends = async () => {
      const data = await axios.post(
        `${baseUrl}/users/current`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setFriendsLists(
          data.data.data.friends
        );
      }
    };
    if (token) {
      fetchFriends();
    }
  }, [user]);

  return (
    <div className="user-friends-page-container page">
      <Header user={user} />
      <div className="card-container">
        <div className="card-head">
          <Banner text="My Friends" />
        </div>
        <div className="card-body">
          {friendLists1 &&
            friendLists1.map(
              (friend) =>
                friend && (
                  <FriendCard
                    id={friend}
                    user={user}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
}
