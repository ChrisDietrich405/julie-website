import {AxiosResponse} from "axios";

export interface ILoginRequest {
  email: string;
  password: string;
}


export interface ILoginBaseResponse {
  message: string;
  status: number;
  token: string;
  userId: string;
}

export type TLoginResponse = AxiosResponse<ILoginBaseResponse>