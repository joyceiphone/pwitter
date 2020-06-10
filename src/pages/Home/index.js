import React from "react";
import {
  useState,
  useEffect,
} from "react";
import {
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";

import UserStatus from "../UserStatus";
import Userfriends from "../Userfriends";
import Userprofile from "../Userprofile";

import Header from "../../components/Header";
import "./index.scss";
import axios from "axios";

export default function UserHomePage({
  match,
}) {
  const _id = match.params.id;
  const [
    tabUser,
    setTabUser,
  ] = useState({});
  useEffect(() => {
    const token = window.localStorage.getItem(
      "token"
    );
    const fetchUser = async () => {
      const data = await axios.get(
        `https://pwitterjoyce.herokuapp.com/users/find/byId?userId=${_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setTabUser({
        ...data.data.data,
      });
    };
    if (token) {
      fetchUser();
    }
  }, []);
  console.log(tabUser);
  const { path, url } = useRouteMatch();
  return (
    <div className="page-content page">
      <Header user={tabUser} />
      <Switch>
        <Route
          path={`${path}/status`}
          component={UserStatus}
        >
          <UserStatus user={tabUser} />
        </Route>
        <Route
          path={`${path}/friends`}
          component={Userfriends}
        >
          <Userfriends user={tabUser} />
        </Route>
        <Route
          path={`${path}/profile`}
          component={Userprofile}
        >
          <Userprofile user={tabUser} />
        </Route>
      </Switch>
    </div>
  );
}
