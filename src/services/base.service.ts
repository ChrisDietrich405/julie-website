import axios, { CreateAxiosDefaults } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// const port = process.env.PORT ?? '3000'

const config: CreateAxiosDefaults = {
  baseURL: `http://localhost:3000`,
};

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const BaseApi = axios.create(config);
export const ApplicationApi = axios.create(config);

ApplicationApi.interceptors.request.use(async (config) => {
  let token = cookies.get("token");

  if (typeof window === "undefined") {
    const { cookies: serverCookies } = await import("next/headers");
    token = serverCookies().get("token")?.value ?? "";
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ApplicationApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
      cookies.remove("token");
      if (!window.location.pathname.includes("/auth")) {
        window.location.href = `/auth/login?url=${window.location.pathname}`;
      }
    }

    throw new Error(error.response);
  }
);

export const handleApi = (server?: boolean) =>
  server ? BaseApi : ApplicationApi;
