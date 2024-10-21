"use client";
import React, { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormContainer } from "./styles.css";

import { useCookies } from "react-cookie";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthLogin } from "@/app/hooks";
import { SnackbarContext } from "@/context/snackbarContext";
import { applyInitialState } from "@mui/x-data-grid/internals";
import { Eater } from "next/font/google";
import { AxiosError } from "axios";

const LoginForm: React.FC<{ route?: string }> = ({ route }) => {
  const router = useRouter();
  const { openError } = useContext(SnackbarContext);
  const [, setCookie] = useCookies(["token"]);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { mutate: doLogin, isPending } = useAuthLogin({
    onSuccess: (response) => {
      const expirationDate = new Date(response.data.expires * 1000);

      setCookie("token", response.data.token, {
        path: "/",
        expires: expirationDate,
      });

      router.push(route ? route : "/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        openError(error.response?.data.message);
      }
    },
  });

  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    doLogin({
      email,
      password,
    });
  };

  return (
    <>
      <FormContainer component="form" onSubmit={onSubmit}>
        <Typography variant="h2">Log in</Typography>
        <TextField
          fullWidth
          size="small"
          type="email"
          name="email"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field with toggle visibility */}
        <TextField
          fullWidth
          size="small"
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          loading={isPending}
        >
          Submit
        </LoadingButton>

        <Typography variant="body1">New to JustArt?</Typography>
        <Link shallow href="/auth/create-account">
          Create an account
        </Link>
      </FormContainer>
    </>
  );
};

export default LoginForm;
