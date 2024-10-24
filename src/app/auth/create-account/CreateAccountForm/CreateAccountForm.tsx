"use client";
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useRouter} from "next/navigation";
import {Grid, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';

import FormContainer from '@/components/forms/FormContainer';
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import {useCreateUser} from "@/app/hooks";
import {SnackbarContext} from "@/context/snackbarContext";
import {AxiosError} from "axios";

const DEFAULT_FORMDATA = {
  name: "",
  streetAddress: "",
  city: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const CreateAccountForm = () => {
  const router = useRouter();
  const {openError, openSuccess} = useContext(SnackbarContext);
  const [formData, setFormData] = useState({...DEFAULT_FORMDATA});
  
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSuccess = () => {
    router.push("/auth/login");
    openSuccess("Created account successfully");
  };

  const onError = ({response}: AxiosError<{ message: string }>) => {
    openError(response?.data.message ?? "");
  };

  const {mutate: createUser, isPending} = useCreateUser({onSuccess, onError});

  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return openError("Confirm password doesn't equal Password");
    }

    createUser(formData);
  };

  return (
    <FormContainer
      maxWidth={600}
      onSubmit={onSubmit}
    >
      <Typography variant="h2">Create account</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            name="streetAddress"
            label="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>

        {/* Password field with toggle visibility */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Confirm password field with toggle visibility */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Password Confirmation"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <LoadingButton
            type="submit"
            loading={isPending}
            variant="contained"
            sx={{
              width: 300,
            }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>

      <Stack direction="row" columnGap={1}>
        <Typography component="span">Already have an account?</Typography>
        <Typography component="span">
          <Link href="/login">Login</Link>
        </Typography>
      </Stack>
    </FormContainer>
  );
};

export default CreateAccountForm;
