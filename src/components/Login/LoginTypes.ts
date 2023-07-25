export interface LoginProps {
    loginFlagHandler: (args: boolean) => void;
  }
  
  export enum ActionType  {
  USERNAME,
  PASSWORD,
  ERROR
  }
  export interface StateInterface {
  username: string,
  password: string,
  error: string
  }
  export type CounterAction =
    | { type: ActionType.USERNAME, payload: string }
    | { type: ActionType.PASSWORD, payload: string }
    | { type: ActionType.ERROR, payload: string };