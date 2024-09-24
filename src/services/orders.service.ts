import {ApplicationApi, BaseApi, handleApi} from "@/services/base.service";
import {Order, OrderData} from "@/interfaces";
import {AxiosResponse} from "axios";

const baseUrl = '/orders'

export const OrdersApi = {
  post: async (params: any): Promise<AxiosResponse<Order>> =>
    ApplicationApi.post(baseUrl, params),
  put: async (orderCodeState: string, params: any): Promise<any> =>
    ApplicationApi.put(`${baseUrl}/${orderCodeState}`, params),
  getAll: async (): Promise<AxiosResponse<OrderData[]>> =>
    ApplicationApi.get(`${baseUrl}`),
  getOne: async (id: string, server?: boolean): Promise<AxiosResponse<Order>> =>
    handleApi(server).get(`${baseUrl}/${id}`)
}
