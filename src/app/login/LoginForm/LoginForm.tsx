"use client";
import React, {FormEvent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

import { FormContainer } from "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import {useGetCart} from "@/app/hooks/services/cart";
import {useCookies} from "react-cookie";
import {Typography, TextField, Snackbar} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAuthLogin} from "@/app/hooks";

const LoginForm = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(['token']);

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const {refetch} = useGetCart({enabled: false});

  const { mutate: doLogin, isPending } = useAuthLogin({
    onSuccess: (response) => {
      setCookie('token', response.data.token, {
        path: '/',
        expires: new Date()
      })

      refetch()
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
      setOpen(true);
    }
  });

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    doLogin({
      email,
      password,
    })
  };

  return (
    <>
      <FormContainer
        component="form"
        onSubmit={onSubmit}
      >
        <Typography variant="h2">Log in</Typography>
        <TextField
          fullWidth
          size="small"
          type="email"
          name="email"
          label="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          size="small"
          type="password"
          name="password"
          label="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          loading={isPending}
        >
          Submit
        </LoadingButton>

        <Typography variant="body1">New to Julie Dtrick?</Typography>
        <Link shallow href="/create-account">Create an account</Link>
      </FormContainer>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Somethin is wrong"
      />
    </>
  );
};

export default LoginForm;
