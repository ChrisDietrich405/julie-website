"use client";
import React, {FormEvent, useContext, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import { FormContainer } from "./styles.css";
import "react-toastify/dist/ReactToastify.css";

import {useCookies} from "react-cookie";
import {Typography, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAuthLogin} from "@/app/hooks";
import {SnackbarContext} from "@/app/context/snackbarContext";

const LoginForm: React.FC<{route?: string}> = ({route}) => {
  const router = useRouter();
  const { openError } = useContext(SnackbarContext)
  const [, setCookie] = useCookies(['token']);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { mutate: doLogin, isPending } = useAuthLogin({
    onSuccess: (response) => {

      const expirationDate = new Date(response.data.expires * 1000)

      setCookie('token', response.data.token, {
        path: '/',
        expires: expirationDate
      })

      router.push(route ? route : "/");
    },
    onError: (error) => {
      openError(error.message?? '')
    }
  });

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

        <Typography variant="body1">New to Julie Art?</Typography>
        <Link shallow href="/create-account">Create an account</Link>
      </FormContainer>
    </>
  );
};

export default LoginForm;
