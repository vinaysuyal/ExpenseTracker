import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({
  isUserLoggedIn: false,
  loggedInUser: "guest",
  logout: () => {},
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isUserLoggedIn, setUserLoggedInState] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("guest");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "jwt " + localStorage.getItem("authToken")
      );
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      let headers = null;
      fetch("http://localhost:8080/auth/login", requestOptions)
        .then((response) => response)
        .then((result) => {
          if (result.status === 401) {
            setUserLoggedInState(false);
            return;
          }
          headers = [...result.headers.entries()].filter((res) =>
            res.includes("authorization")
          )[0][1];
          return result.json();
        })
        .then((result) => {
          login(headers, result.name);
        })
        .catch((error) => console.log("error", error));
    } else {
      setUserLoggedInState(false);
    }
  }, []);
  const logout = () => {
    setUserLoggedInState(false);
    localStorage.removeItem("authToken");
  };
  const login = (authToken, loggedInUser) => {
    setUserLoggedInState(true);
    setLoggedInUser(loggedInUser);
    localStorage.setItem("authToken", authToken);
  };
  console.log(isUserLoggedIn);
  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        loggedInUser: loggedInUser,
        logout: logout,
        login: login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
