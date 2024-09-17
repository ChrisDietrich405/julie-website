"use client";
import {
  createContext,
} from "react";

import {useCookies} from "react-cookie";
import {useGetUser} from "@/app/hooks";
import { User } from "@/interfaces";

export const userContext = createContext<{
  user?: User;
}>({ user: undefined});

export const UserContextProvider = ({ children }: any) => {
  const [ cookie ] = useCookies(['token']);

  const { data: user } = useGetUser({ token: cookie.token });

  return (
    <userContext.Provider value={{ user }}>
      {children}
    </userContext.Provider>
  );
};
