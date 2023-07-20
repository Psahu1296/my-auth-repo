import "./Login.css";

import React, { useState } from "react";

// username: "mor_2314",
// password: "83r5^_",
const URL = "https://fakestoreapi.com/auth/login";

interface LoginProps {
  loginFlagHandler: (args: boolean) => void;
}

const Login = ({ loginFlagHandler }: LoginProps) => {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "user") {
      setUser(e.target.value);
    } else if (type === "pass") {
      setPass(e.target.value);
    }
  };

  const loginCallHandler = async () => {
    try {
      if (user && pass) {
        const param = {
          method: "POST",
          body: JSON.stringify({
            password: pass,
            username: user,
          }),
        };
        const response = await fetch(URL, param);
        const data = await response.json();
        console.log("data=>>", data);
        loginFlagHandler(true);
      }
    } catch (err) {
      console.log("Error=>>", err);
      loginFlagHandler(false);
    }
  };
  return (
    <div className="overlay" data-testid="login-page">
      <form
        data-testid="login-form"
        className="wrapper"
        onSubmit={e => {
          e.preventDefault();
          loginCallHandler();
        }}
      >
        <h1 data-testid="title" className="title">
          Sign In
        </h1>
        <div className="input_wrapper">
          <label data-testid="user-label" htmlFor="username">
            Username
          </label>
          <input
            data-testid="text-input"
            type="text"
            placeholder="Username"
            className="input"
            value={user}
            onChange={e => changeHandler(e, "user")}
          />
        </div>
        <div className="input_wrapper">
          <label data-testid="password-label" htmlFor="password">
            Password
          </label>
          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            className="input"
            value={pass}
            onChange={e => changeHandler(e, "pass")}
          />
        </div>
        <button data-testid="submit-btn" type="submit" className="sign-in-btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
