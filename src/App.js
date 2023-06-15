import * as React from "react";
import { useContext } from "react";
import "./App.css";
import PrimarySearchAppBar from "./Components/Header";
import HomeComponent from "./Components/HomeComponent";
import Login from "./Components/auth/Login";
import { AuthContext } from "./Context/authContext";
import FromToContextProvider from "./Context/fromToContext";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <FromToContextProvider>
      <div style={{ display: "flex", flexDirection: "column" }} className="App">
        {authContext.isUserLoggedIn && (
          <>
            <PrimarySearchAppBar />
            <HomeComponent />
          </>
        )}
        {authContext.isUserLoggedIn === false && <Login />}
      </div>
    </FromToContextProvider>
  );
}

export default App;
