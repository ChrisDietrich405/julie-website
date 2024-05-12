"use client";
import React, { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Container } from "@mui/joy";
import Grid from "@mui/material/Grid";

import styles from "./styles.module.css";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Confirm password doesn't equal Password");
    }
    try {
      await axios.post("/api/user", {
        name,
        streetAddress,
        city,
        email,
        password,
      });

      router.push("/login");
      toast.success("Created account successfully");
    } catch (error: unknown) {
      const errorMessage = (error as AxiosError<{ message: string }>).response
        ?.data.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Container
      className={`"main-content" ${styles.container_background}`}
      maxWidth="xl"
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <h2 style={{ marginBottom: "20px" }}>Create account</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <label htmlFor="name" className={styles.label}>
              Name
              <input
                type="text"
                name="name"
                id="name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="streetAddress" className={styles.label}>
              Street Address
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                className={styles.input}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="city" className={styles.label}>
              City
              <input
                type="text"
                name="city"
                id="city"
                className={styles.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <label htmlFor="email" className={styles.label}>
              Email
              <input
                type="text"
                name="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <label htmlFor="password" className={styles.label}>
              Password
              <input
                type="password"
                name="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <label htmlFor="confirmation-password" className={styles.label}>
              Password Confirmation
              <input
                type="password"
                name="confirmation-password"
                id="confirmation-password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateAccount;
