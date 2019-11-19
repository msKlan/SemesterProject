import React, { useState } from "react";

export default function Login(props) {
  const { isLoggedIn, login, logout } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = evt => {};

  const loginSubmit = () => {
    // console.log("Login - loginSubmit: ", isLoggedIn, username, password);
    login(username, password);
  };

  return (
    <div>
      {!isLoggedIn && (
        <>
          <h2>Login</h2>
          <form onChange={onChange} onSubmit={loginSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="User name"
                onChange={event => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {isLoggedIn && (
        <>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Logout</h4>
            </div>
            <div className="modal-body">Are you sure you want to log-off?</div>
            <div className="modal-footer">
              <button onClick={logout} className="btn btn-primary btn-block">
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
