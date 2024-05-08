"use client";
import React, {FormEvent, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Container} from "@mui/joy";

import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

import {useGetCart} from "@/app/hooks/services/cart";
import {useCookies} from "react-cookie";
import {CircularProgress} from "@mui/material";

const Login = () => {
  const [, setCookie] = useCookies(['token']);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {refetch} = useGetCart({enabled: false});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth", {
        email,
        password,
      });

      refetch();

      setCookie('token', response.data.token, {
        path: '/',
        expires: response.data.expires
      })

      router.push("/");

    } catch (error: unknown) {
      const errorMessage = (error as AxiosError<{ message: string }>).response
        ?.data.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xl"
      className={`"main-content" ${styles.container_background}`}
    >

      {loading ? (
        <div className={styles.loader}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <form onSubmit={onSubmit} className={styles.form}>
          <h2>Log in</h2>
          <label htmlFor="email" className={styles.label}>
            email
            <input
              type="text"
              name="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className={styles.label}>
            password
            <input
              type="password"
              name="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className={styles.button}>
            Submit
          </button>

          <p style={{marginBottom: "10px"}}>New to Julie Dtrick?</p>
          <Link shallow href="/create-account">Create an account</Link>
        </form>
      )}
    </Container>
  );
};

export default Login;
