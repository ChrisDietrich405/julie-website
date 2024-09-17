import {AxiosResponse} from "axios";

export enum RoleEnum {
  ADMIN = 0,
  CUSTOMER = 1
}

export interface User {
  city: string;
  email: string;
  name: string;
  streetAddress: string;
  role?: RoleEnum
}

export interface UserBaseRequest extends User {
  password: string;
}

export type UserResponse = AxiosResponse<User>
