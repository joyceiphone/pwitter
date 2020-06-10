import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "./index.scss";

export default function LoginPage({
  history,
}) {
  const [values, setValues] = useState(
    {}
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      const loginResult = await axios.post(
        "https://pwitterjoyce.herokuapp.com/auth/login",
        values
      );
      if (loginResult.data.success) {
        window.localStorage.setItem(
          "token",
          loginResult.data.data
        );
        history.push("/");
        window.location.reload();
      } else {
        alert(loginResult.data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login-page page">
      <h1>Pwitter</h1>
      <div className="form-container">
        <h3>Sign in</h3>
        <form
          onSubmit={(e) =>
            e.preventDefault()
          }
          className="form-card"
        >
          <div className="input-container">
            <input
              name="phone"
              className="regular-input"
              type="phone"
              placeholder="Enter your phone here"
              value={values.phone}
              onChange={
                handleInputChange
              }
            />
          </div>
          <div className="input-container">
            <input
              name="password"
              className="regular-input"
              type="password"
              placeholder="Enter your password here"
              value={values.password}
              onChange={
                handleInputChange
              }
            />
          </div>
          <div className="input-container">
            <input
              type="checkbox"
              className="check-input"
            />
            <label>
              Remember Password
            </label>
          </div>
          <button onClick={handleLogin}>
            Submit
          </button>
        </form>
        <p>
          Don't have an account?
          <span>
            <Link
              className="link-text"
              to="../register"
            >
              Register for one now.
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
