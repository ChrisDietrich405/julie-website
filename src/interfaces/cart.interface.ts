import {AxiosResponse} from "axios";
import {AvailableWork} from "@/interfaces/availableWork.interface";

export type Cart = {
  items: AvailableWork[]
  amount: number;
  userId: string;
}

export type ICartResponse = AxiosResponse<Cart>
