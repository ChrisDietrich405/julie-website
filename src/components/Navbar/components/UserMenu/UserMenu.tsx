"use client"
import {Button} from "@mui/material";
import Link from "next/link";
import {useCookies} from "react-cookie";

export default function UserMenu() {
  const [cookies, , removeCookies] = useCookies()

  const token = cookies.token;

  return (
    <Link href={'/auth/login'}>
      <Button
        variant="contained"
        color={token ? 'warning' : 'primary'}
        onClick={() => removeCookies('token')}
      >
        {token ? 'Log out' : 'Log in'}
      </Button>
    </Link>
  );
}
