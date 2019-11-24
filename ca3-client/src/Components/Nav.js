import React from "react";
import { NavLink } from "react-router-dom";

import "../App.css";

function Nav(props) {
  const { isLoggedIn, loginMsg, username } = props;

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink activeClassName="active" to="/flights">
                Flights
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/add-item">
                Add item
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/find-item">
                Find item
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink activeClassName="active" to="/login-out">
            {loginMsg} <small>{username && `(${username})`}</small>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
