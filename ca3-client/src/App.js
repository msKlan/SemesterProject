import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  // Prompt,
  useHistory
  // useParams,
  // Redirect
} from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Product from "./Product";
// import AddEditItem from "./AddEditItem";
import Login from "./Login";

import "./App.css";

function NoMatch() {
  return (
    <div>
      <h2>This URL does not exist!</h2>
    </div>
  );
}

function App({ apiFacade, match }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const emptyItem = { id: "", title: "No data", info: "" };
  // const [itemToAddEdit, setItemToAddEdit] = useState(emptyItem);
  const [items, setItems] = useState([emptyItem]);

  let history = useHistory();

  const login = (username, password) => {
    console.log(username, password);
    apiFacade
      .login(username, password)
      .then(data => {
        setIsLoggedIn(apiFacade.loggedIn);
        setUsername(username);
        getItems();
        // history.push("/products");
      })
      .catch(err => {
        console.log("Ups login:" + err);
        // history.push("/");
      });
    history.push("/products");
  };

  const logout = () => {
    apiFacade.logout();
    setIsLoggedIn(apiFacade.loggedIn);
    setUsername("");
    history.push("/");
  };

  // Get all items from back-end when rendering
  useEffect(() => {
    getItems();
  }, [apiFacade]);

  // Get all items from back-end
  const getItems = () => {
    console.log("getItems:", apiFacade);
    apiFacade
      .getItems()
      .then(data => {
        setItems(data);
      })
      .catch(err => console.log("Ups refreshitems:" + err));
  };

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
        <Route path="/products" exact>
          <Product
            items={items}
            // editItem={editItem}
            // deleteItem={deleteItem}
            // findItem={findItem}
            // storeAddEditItem={storeAddEditItem}
          />
        </Route>
        {/* <Route path="/add-item">
          <Additem apiFacede={apiFacade} />
        </Route> */}
        {/* <Route path="/products/:id">
          <AddEditItem
            items={items}
            findItem={findItem}
            addEditItem={storeAddEditItem}
          />
        </Route> */}
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
