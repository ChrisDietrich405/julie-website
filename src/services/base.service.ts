import axios, {CreateAxiosDefaults} from "axios";

const port = process.env.PORT ?? 3001

const config: CreateAxiosDefaults = {
  baseURL: `http://localhost:${port}`,
}

export const BaseApi = axios.create(config)
export const ApplicationApi = axios.create()

ApplicationApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token");

    return config;
  }
)