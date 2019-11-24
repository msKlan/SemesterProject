import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Home";
import List from "./Containers/List";
import "./styles.css";

function App({ apiFacade, match }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  let history = useHistory();

  const login = (username, password) => {
    console.log(username, password);
    apiFacade
      .login(username, password)
      .then(data => {
        setIsLoggedIn(apiFacade.loggedIn());
        // console.log("Am I logged in? ", isLoggedIn);
        setUsername(username);
        // getItems();
        // console.log("Kommer jeg her1?", isLoggedIn, history.location);
        history.push("/flights");
        // console.log("Kommer jeg her2?", history.location);
      })
      .catch(err => {
        console.log("Ups login:" + err);
        // history.push("/");
      });
    // console.log("Kommer jeg også her?");
    history.push("/flights");
  };

  const logout = () => {
    apiFacade.logout();
    setIsLoggedIn(apiFacade.loggedIn);
    setUsername("");
    history.push("/");
  };

  function NoMatch() {
    return (
      <div>
        <h4>This URL does not exist or you are not logged in!</h4>
      </div>
    );
  }

  return (
    <div>
      <Nav
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        username={username}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {isLoggedIn ? (
          <Route path="/flights" exact>
            <List apiFacade={apiFacade} />
          </Route>
        ) : (
          ""
        )}
        <Route path="/login-out">
          <Login isLoggedIn={isLoggedIn} login={login} logout={logout} />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
