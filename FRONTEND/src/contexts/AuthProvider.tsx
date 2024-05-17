import React, { createContext, useState } from "react";
import { UserProfile } from "../types/UserType";
import AuthApi from "../api/AuthApi";

type Props = { children: React.ReactNode };

type AuthContextType = {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  signIn: async (username: string, password: string) => false,
  signOut: async () => {},
  updateToken: async (token: string) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const authApi = new AuthApi();

  const signIn = async (username: string, password: string) => {
    let result = await authApi.SignIn(username, password);
    if (result)
      setData((prevState) => ({ ...prevState, ...result, isLoggedIn: true }));
    return result ? true : false;
  };

  const signOut = async () => {
    await authApi.SignOut();
    setData((prevState) => ({
      ...prevState,
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,
    }));
  };

  const updateToken = async (token: string) => {
    await authApi.RefreshToken(token);
  };

  const [data, setData] = useState<AuthContextType>({
    ...JSON.parse(localStorage.getItem("_auth")!),
    isLoggedIn: JSON.parse(localStorage.getItem("_auth")!) ? true : false,
    signIn: signIn,
    signOut: signOut,
    updateToken: updateToken,
  });

  return (
    <AuthContext.Provider value={{ ...data }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
