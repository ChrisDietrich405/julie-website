import React from "react";
import dynamic from "next/dynamic";

const LoginTemplate = dynamic(() => import('./LoginTemplate'), { ssr: false } );

interface LoginProps {
  searchParams: {
    url?: string;
  };
}

const Login: React.FC<LoginProps> = ({searchParams}) =>
  <LoginTemplate searchParams={searchParams} />

export default Login;
