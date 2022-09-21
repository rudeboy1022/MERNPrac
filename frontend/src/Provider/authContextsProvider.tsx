import React, { createContext, useReducer } from "react";

type authProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type LoginAction = {
  type: "LOGIN";
  payload: { user: string | null };
};
type LogoutAction = {
  type: "LOGOUT";
};

type ACTIONTYPE = LoginAction | LogoutAction;

type createContextProps = {
  state?: string;
  dispatch: React.Dispatch<ACTIONTYPE>;
};

type Iuser = {
  _id?: string;
  email?: string;
  password?: string;
};

type State = {
  user: Iuser | null;
};

export const authContext = createContext({} as createContextProps);

export const authReducer = (
  state: State = initialState,
  action: ACTIONTYPE
): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const initialState: State = {
  user: null,
};

export const AuthContextProvider = ({ children }: authProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("AuthContext state:", state);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
