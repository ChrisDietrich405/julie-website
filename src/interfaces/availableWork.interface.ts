import { AxiosResponse } from "axios";

export interface AvailableWork {
  _id: string;
  image: string;
  price: number;
  measurements: string;
  title: string;
  status: string;
}

export type TAvailableWorksResponse = AxiosResponse<AvailableWork[]>;
export type TAvailableWorkResponse = AxiosResponse<AvailableWork>;
