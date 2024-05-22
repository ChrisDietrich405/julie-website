import {AxiosResponse} from "axios";
import {IAvailableWork} from "@/models/availableWork.model";

export interface IOrderBaseResponse {
  status: number,
  message: string,
  orderId: string,
  customer: {
    name: string,
    email: string,
    phoneNumber: number
  },
  deliveryAddress: {
    streetAddress: string,
    city: string,
    zipCode: string
  },
  availableWorks: IAvailableWork[]
}

export type TOrderResponse = AxiosResponse<IOrderBaseResponse>;