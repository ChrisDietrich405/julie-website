import React from "react";
import {Container} from "@mui/joy";

import {BackgroundBox} from "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('./LoginForm'));

const Login = () => {
  return (
    <BackgroundBox>
      <Container>
        <LoginForm />
      </Container>
    </BackgroundBox>
  );
};

export default Login;
