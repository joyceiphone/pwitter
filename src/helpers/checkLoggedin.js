const checkLoggedin = () => {
  const token = window.localStorage.getItem(
    "token"
  );
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default checkLoggedin;
