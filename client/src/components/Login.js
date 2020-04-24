import React from "react";
import { Route, Switch } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login({ onLogin }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <label>
        Username:
        <input ref={register} type="text" name="username" />
      </label>
      <label>
        Password:
        <input ref={register} type="password" name="password" />
      </label>
      <button>Login</button>
    </form>
  );
}

export default Login;
