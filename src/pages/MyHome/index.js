import React from "react";

import LeftbarRoute from "../../components/Leftbar";
import StrangerBar from "../../components/StrangerBar";
import MyStatus from "../../components/MyStatus";
import MyFriendsStatus from "../../components/MyFriendsStatus";

import "./index.scss";

export default function Myhome({
  user,
}) {
  let total = 0;
  if (user.friends) {
    total = user.friends.length;
  }

  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <LeftbarRoute
            user={user}
            title="My Friends"
            total={total}
          />
          <StrangerBar
            user={user}
            title="Friends you may know"
          />
        </div>
        <div className="home-page-right">
          <div className="right-container-head">
            {" "}
            <MyStatus user={user} />
          </div>
          <div className="right-container-body">
            <MyFriendsStatus
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
