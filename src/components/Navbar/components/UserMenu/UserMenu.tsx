"use client";
import {useCookies} from "react-cookie";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";

export default function UserMenu() {
  const router = useRouter();
  const [{token}, _, removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    removeCookie('token')
  };

  const onClick = () => {
    if (token) {
      handleLogout();
    }

    const route = token ? '/' : '/auth/login';

    router.push(route)
  }

  return (
    <Button
      variant="contained"
      color={token ? 'warning' : 'primary'}
      onClick={onClick}
    >
      {token ? 'Log out' : 'Log in'}
    </Button>
  );
}
