import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserHomePage from "./pages/Home";

import Myfriends from "./pages/Myfriends";
import Myprofile from "./pages/Myprofile";
import Myhome from "./pages/MyHome";
import Mysetting from "./pages/Mysetting";

export default function Routes({
  user,
}) {
  return (
    <div>
      <Switch>
        <Route
          path="/login"
          component={LoginPage}
        ></Route>
        <Route
          path="/register"
          component={RegisterPage}
        ></Route>
        <Route
          exact
          path="/"
          component={Myhome}
        >
          <Myhome user={user} />
        </Route>
        <Route
          path="/friends"
          component={Myfriends}
        >
          <Myfriends user={user} />
        </Route>
        <Route
          path="/profile"
          component={Myprofile}
        >
          <Myprofile user={user} />
        </Route>
        <Route
          path="/setting"
          component={Mysetting}
        >
          <Mysetting user={user} />
        </Route>
        <Route
          path="/:id"
          component={UserHomePage}
        ></Route>
      </Switch>
    </div>
  );
}
