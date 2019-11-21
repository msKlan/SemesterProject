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
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import "react-datepicker/dist/react-datepicker.css";

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
  const [date, setDate] = useState(new Date());

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
  const dd_options = ["one","two","three"]
  const dd_defaultOption = "one";
  const onSelect = sel => {console.log(sel);}

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

  const handleChange = date => {
    setDate( date );
  };

  const enterCity  = (city) => {
      console.log(city);
      apiFacade.getCity(city)
      // apiFacade.getItems()
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log("Ups enterCity:" + err));
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
        <Route path="/products" exact>
        <input
          type="text"
          placeholder="Type departure city"
          id="departureCity"
          onKeyDown={e=> {if(e.key==="Enter"){enterCity(e.target.value)}}}
        />
        <Dropdown
          options={dd_options}
          onChange={onSelect}
          //value={dd_defaultOption}
          placeholder="select a departure airport"
        />
        <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="dd-MMM-yyyy"
      />
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
