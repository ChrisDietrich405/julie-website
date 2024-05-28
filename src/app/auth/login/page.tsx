import React, {Context} from "react";
import {Container} from "@mui/joy";

import {BackgroundBox} from "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('./LoginForm'));

interface LoginProps {
  searchParams: {
    url?: string;
  };
}

const Login: React.FC<LoginProps> = ({searchParams}) =>
  <BackgroundBox>
    <Container>
      <LoginForm route={searchParams.url} />
    </Container>
  </BackgroundBox>

export default Login;
