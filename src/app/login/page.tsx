"use client";
import React, { useState, FormEvent, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { Container } from "@mui/joy";

import { userContext } from "../context/userContext";
import { cartContext } from "@/app/context/cartContext";

import styles from "./styles.module.css";
import "react-toastify/dist/ReactToastify.css";

<Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="oval-loading"
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}
/>;

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, setUserId } = useContext(userContext);
  const { cart } = useContext(cartContext);

  const router = useRouter();

  router.prefetch('/delivery-details')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth", {
        email,
        password,
      });
      setUserId(response.data.userId);

      localStorage.setItem("token", `Bearer ${response.data.token}`);

      if (cart.length === 0) {
        router.push("/", );
      }

      if (cart.length > 0) {
        router.push("/delivery-details");
      }
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
          <Oval />
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

          <p style={{ marginBottom: "10px" }}>New to Julie Dtrick?</p>
          <Link shallow href="/create-account">Create an account</Link>
        </form>
      )}
    </Container>
  );
};

export default Login;
