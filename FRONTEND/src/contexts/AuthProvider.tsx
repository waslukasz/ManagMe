import React, { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { User, UserEntity } from "../types/UserTypes";

type Props = { children: React.ReactNode };

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  oauth: (user: User) => Promise<void>;
  updateToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  signIn: async (username: string, password: string) => false,
  signOut: async () => {},
  oauth: async (user: User) => {},
  updateToken: async (token: string) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    await axios
      .post<UserEntity>("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setData((prevState) => ({
          ...prevState,
          user: new User(response.data),
          isLoggedIn: true,
        }));
        return true;
      })
      .catch(() => {});
    return false;
  };

  const signOut = async () => {
    await axios.post("/auth/logout");
    setData((prevState) => ({ ...prevState, user: null, isLoggedIn: false }));
  };

  const updateToken = async (token: string) => {
    // TODO
  };

  const oauthSignIn = async (user: User) => {
    setData((prevState) => ({
      ...prevState,
      user: user,
      isLoggedIn: true,
    }));
  };

  useEffect(() => {
    if (!document.cookie.includes("_auth")) return;

    axios.get<UserEntity>("/auth").then((response) => {
      setData((prevState) => ({
        ...prevState,
        user: new User(response.data),
        isLoggedIn: true,
      }));
    });
  }, []);

  const [data, setData] = useState<AuthContextType>({
    user: null,
    isLoggedIn: false,
    signIn: signIn,
    signOut: signOut,
    oauth: oauthSignIn,
    updateToken: updateToken,
  });

  return (
    <AuthContext.Provider value={{ ...data }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
