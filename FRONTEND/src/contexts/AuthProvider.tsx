import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../types/UserType";
import axios from "../api/axios";

type Props = { children: React.ReactNode };

type AuthContextType = {
  user: UserProfile | null;
  isLoggedIn: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateToken: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  signIn: async (username: string, password: string) => false,
  signOut: async () => {},
  updateToken: async (token: string) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    await axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const user: UserProfile = { ...response.data };

        setData((prevState) => ({
          ...prevState,
          user: { ...user },
          isLoggedIn: true,
        }));
        return true;
      });
    return false;
  };

  const signOut = async () => {
    await axios.post("/auth/logout");
    setData((prevState) => ({ ...prevState, user: null, isLoggedIn: false }));
  };

  const updateToken = async (token: string) => {
    // TODO
  };

  useEffect(() => {
    if (!document.cookie.includes("_auth")) return;

    axios.get("/auth").then((response) => {
      const user: UserProfile = { ...response.data };

      setData((prevState) => ({
        ...prevState,
        user: { ...user },
        isLoggedIn: true,
      }));
    });
  }, []);

  const [data, setData] = useState<AuthContextType>({
    user: null,
    isLoggedIn: false,
    signIn: signIn,
    signOut: signOut,
    updateToken: updateToken,
  });

  return (
    <AuthContext.Provider value={{ ...data }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
