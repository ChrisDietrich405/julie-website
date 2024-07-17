import { AxiosResponse } from "axios";

export interface IAvailableWork {
  _id: string;
  image: string;
  price: number;
  measurements: string;
  title: string;
  status: string;
}

export type TAvailableWorksResponse = AxiosResponse<IAvailableWork[]>;
export type TAvailableWorkResponse = AxiosResponse<IAvailableWork>;
