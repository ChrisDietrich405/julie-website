import axios, {CreateAxiosDefaults} from "axios";
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

const port = process.env.PORT ?? ''

const config: CreateAxiosDefaults = {
  baseURL: `http://localhost:${port}`,
}

export const BaseApi = axios.create(config)
export const ApplicationApi = axios.create(config)

ApplicationApi.interceptors.request.use(
  async (config) => {
    let token = cookies.get('token')

    if (typeof window === 'undefined') {
      const {cookies: serverCookies} = await import("next/headers");
      token = serverCookies().get('token')?.value ?? ''
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
)