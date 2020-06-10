import React from "react";

const baseUrl =
  "https://pwitter.demo.bctc.io";

const fetchUsers = () => {
  return fetch(
    `${baseUrl}/users/fetch`
  ).then(response => {
    return response.json();
  });
};

const fetchCurrent = () => {};

const UserServices = {
  fetchUsers
};

export default UserServices;
