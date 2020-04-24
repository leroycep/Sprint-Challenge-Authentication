import React from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import axiosWithAuth from "./axiosWithAuth.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Jokes from "./components/Jokes.js";

const API = "http://localhost:3300/api";

function App() {
  const history = useHistory();

  const onLogin = (user) => {
    axios
      .post(`${API}/auth/login`, user)
      .then((res) => {
        window.localStorage.setItem("jokes-token", JSON.stringify(res.data.token));
        history.push("/jokes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegister = (user) => {
    axios
      .post(`${API}/auth/register`, user)
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJokes = (user) => {
    return axiosWithAuth()
      .get("jokes")
      .then((res) => res.data);
  };

  return (
    <div>
      <Switch>
        <Route
          path="/register"
          render={(props) => <Register onRegister={onRegister} {...props} />}
        />
        <Route
          path="/login"
          render={(props) => <Login onLogin={onLogin} {...props} />}
        />
        <Route
          path="/jokes"
          render={(props) => <Jokes fetchJokes={fetchJokes} {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
