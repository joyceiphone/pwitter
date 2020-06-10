import React, {
  useEffect,
} from "react";
import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import axios from "axios";

import checkLoggedin from "./helpers/checkLoggedin";

import "./styles/global.scss";

function App() {
  const [user, setUser] = useState({
    isLoggedin: false,
  });
  useEffect(() => {
    const token = window.localStorage.getItem(
      "token"
    );
    const fetchUser = async () => {
      const data = await axios.post(
        "https://pwitterjoyce.herokuapp.com/users/current",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setUser({
        ...data.data.data,
        isLoggedin: true,
      });
    };
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      {!checkLoggedin() && (
        <Redirect to="/login" />
      )}
      {user.isLoggedin && (
        <Navbar user={user} />
      )}
      <div className="App">
        <Routes user={user} />
      </div>
    </Router>
  );
}

export default App;
