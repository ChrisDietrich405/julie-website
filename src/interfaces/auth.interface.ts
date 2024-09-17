import {AxiosResponse} from "axios";

export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginBaseResponse {
  message: string;
  status: number;
  token: string;
  userId: string;
  expires: number;
}

export type LoginResponse = AxiosResponse<LoginBaseResponse>