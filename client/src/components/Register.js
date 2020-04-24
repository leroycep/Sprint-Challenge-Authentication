import React from "react";
import { Route, Switch } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register({ onRegister }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <label>
        Username:
        <input ref={register} type="text" name="username" />
      </label>
      <label>
        Password:
        <input ref={register} type="password" name="password" />
      </label>
      <button>Register</button>
    </form>
  );
}

export default Register;
