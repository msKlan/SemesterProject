import URL from "./settings";
// const backendURL = "http://localhost:8080/securitystarter"; // Kun til udvikling

function apiFacade() {
  const makeOptions = (method, addToken, body) => {
    // method: GET, POST, PUT, DELETE
    // addToken: true: add JWT, false: no JWT
    // body: body to add if any
    // Return: options for fetch-method
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        // "Origin": "http://localhost:3000",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  // Generic errorhandler for fetch-metod
  function handleHttpErrors(res) {
    console.log(res);
    if (!res.ok) {
      removeToken(); // Remove JWT if an error occurred
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  // Store JWT in localStorage
  const setToken = token => {
    console.log("setToken: ", token);
    localStorage.setItem("jwtToken", token);
  };

  // Get JWT from localStorage - if any
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  // Remove JWT from localStorage - if any
  const removeToken = () => {
    localStorage.removeItem("jwtToken");
  };

  // Return loggedIn true if there is a JWT
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  // Login and store JWT ig successful
  const login = (username, password) => {
    // console.log("apiFacade-login: ", username, password);
    const options = makeOptions("POST", true, {
      username: username,
      password: password
    });
    // console.log("login:", options);
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        console.log("apiFacade-login: ", res.token);
        // TBD - Store other data from login if any - roles?
      });
  };

  // Logout and remove store JWT
  const logout = () => {
    removeToken();
  };

  const getCity = (city) => {
    console.log("getCity: ", ">"+URL + "/api/info/place/" + city);
    return fetch(URL).then(handleHttpErrors);
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/info/place/" + city.toString(), options).then(handleHttpErrors);
  };

  const getItems = () => {
    console.log("getItems: ", URL);
    // return fetch(URL).then(handleHttpErrors);
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/info/userdata", options).then(handleHttpErrors);
  };

  function addEditItem(item) {
    //Complete me. A smart version will handle both Add and Edit, but focus on Add (POST) only first
    console.log("addEditItem1:", makeOptions("POST", true, item));
    const method = item.id ? "PUT" : "POST";
    const idParam = item.id ? "/" + item.id : "";
    console.log(method);
    return fetch(URL + idParam, makeOptions(method, item)).then(
      handleHttpErrors
    );
  }

  return {
    // Remember all statements below are a shortcut for this version: getitems: getitems
    login,
    logout,
    loggedIn,
    getItems,
    getCity
  };
}

// let returnVal = apiFacade();
// export default returnVal;
export default apiFacade();
