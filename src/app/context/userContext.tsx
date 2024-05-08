"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";

import {useCookies} from "react-cookie";
import {useGetUser} from "@/app/hooks";
import {IUser} from "@/models";

export const userContext = createContext<{
  user?: IUser;
}>({ user: undefined});

export const UserContextProvider = ({ children }: any) => {
  const [ cookie ] = useCookies(['token']);

  const { data } = useGetUser(cookie.token);

  const user = data?.data;

  return (
    <userContext.Provider value={{ user }}>
      {children}
    </userContext.Provider>
  );
};
