import React from "react";
import {Container} from "@mui/material";

import {BackgroundBox} from "./styles.css";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('./LoginForm'));

interface LoginProps {
  searchParams: {
    url?: string;
  };
}

const LoginTemplate: React.FC<LoginProps> = ({searchParams}) =>
  <BackgroundBox>
    <Container>
      <LoginForm route={searchParams.url}/>
    </Container>
  </BackgroundBox>

export default LoginTemplate;
