import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

function Login({ fetchJokes }) {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchJokes()
      .then((jokes) => setJokes(jokes))
      .catch((err) => console.log(err));
  }, [fetchJokes]);

  return (
    <div>
      {jokes.map((j) => (
        <div key={j.id}>{j.joke}</div>
      ))}
    </div>
  );
}

export default Login;
