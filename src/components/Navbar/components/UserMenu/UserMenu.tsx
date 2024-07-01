import {Button} from "@mui/material";
import {cookies} from 'next/headers'
import Link from "next/link";

function getToken() {
  const cookieStore = cookies()

  return cookieStore.get('token')?.value;
}

export default function UserMenu() {
  const token = getToken();

  const route = token ? '/auth/logout' : '/auth/login';

  return (
    <Link href={route}>
      <Button
        variant="contained"
        color={token ? 'warning' : 'primary'}
      >
        {token ? 'Log out' : 'Log in'}
      </Button>
    </Link>
  );
}
