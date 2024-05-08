import {AxiosResponse} from "axios";

export interface IUser {
  name: string;
  email: string;
  city: string;
  streetAddress: string;
}

export type IUserResponse = AxiosResponse<IUser>
