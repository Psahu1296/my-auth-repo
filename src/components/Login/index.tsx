import "./Login.css";
import React, { useReducer } from "react";
import { ActionType, CounterAction, LoginProps, StateInterface } from "./LoginTypes";

// username: "mor_2314",
// password: "83r5^_",
const URL = "https://fakestoreapi.com/auth/login";

const initialState: StateInterface = {
  username: "",
  password: "",
  error: "",
};

export const userReducer = (initialState:StateInterface, action:CounterAction): StateInterface => {
  switch(action.type) {
    case ActionType.USERNAME:
      return {...initialState, username: action.payload}
    case ActionType.PASSWORD:
      return {...initialState, password: action.payload}
    case ActionType.ERROR:
      return {...initialState, error: action.payload}
    default:
      return initialState
  }
} 
const Login = ({ loginFlagHandler }: LoginProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (state.error) {
      dispatch({type: ActionType.ERROR, payload: ""});
    }
    if (type === "user") {
      dispatch({type: ActionType.USERNAME , payload: e.target.value});
    } else if (type === "pass") {
      dispatch({type: ActionType.PASSWORD , payload: e.target.value});
    }
  };

  const loginCallHandler = async () => {
    try {
      if (!state.username || !state.password) {
        dispatch({type: ActionType.ERROR, payload: "Your username or password must be incorrect"});
        return;
      }
      if (state.username && state.password) {
        const userData = {
          username: state.username,
          password: state.password,
        };
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        sessionStorage.setItem("isAuthorized", data.token);
        loginFlagHandler(true);
      }
    } catch (err) {
      console.log("Error=>>", err);
      loginFlagHandler(false);
      dispatch({type: ActionType.ERROR, payload: "Something went wrong!"});
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
          <label id="username" data-testid="user-label" htmlFor="username">
            Username
          </label>
          <input
            data-testid="text-input"
            type="text"
            placeholder="Username"
            className="input"
            value={state.username}
            onChange={e => changeHandler(e, "user")}
          />
        </div>
        <div className="input_wrapper">
          <label id="password" data-testid="password-label" htmlFor="password">
            Password
          </label>
          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            className="input"
            value={state.password}
            onChange={e => changeHandler(e, "pass")}
          />
        </div>
        {state.error && <span data-testid="error-msg" className="error-text">
          *{state.error}
        </span>}
        <button data-testid="submit-btn" type="submit" className="sign-in-btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
