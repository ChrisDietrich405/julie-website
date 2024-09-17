"use client";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function UserMenu() {
  const [cookies, , removeCookies] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Synchronize with cookies on the client side
    setIsLoggedIn(!!cookies.token);
  }, [cookies]);

  const handleLogout = () => {
    removeCookies('token');
    setIsLoggedIn(false);
  };

  return (
    <Link shallow href={isLoggedIn ? '/' : '/auth/login'}>
      <Button
        variant="contained"
        color={isLoggedIn ? 'warning' : 'primary'}
        onClick={isLoggedIn ? handleLogout : undefined}
      >
        {isLoggedIn ? 'Log out' : 'Log in'}
      </Button>
    </Link>
  );
}
