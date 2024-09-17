"use client";
import {useCookies} from "react-cookie";
import {useRouter} from "next/navigation";

export const useHandleRedirect = (route: string) => {
  const router = useRouter();
  const [{token}, _, removeCookie] = useCookies(['token']);

  const redirect = () => router.push(token ? route : "/auth/login")

  return {redirect};
};
