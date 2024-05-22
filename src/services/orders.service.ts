import {ApplicationApi, BaseApi, handleApi} from "@/services/base.service";
import { TOrderResponse } from "@/models";

const baseUrl = '/api/orders'

export const OrdersApi = {
  post: async (params: any): Promise<TOrderResponse> =>
    ApplicationApi.post(baseUrl, params),
  put: async (orderCodeState: string, params: any): Promise<any> =>
    ApplicationApi.put(`${baseUrl}/${orderCodeState}`, params),
  get: async (id: string,): Promise<TOrderResponse> =>
    ApplicationApi.get(`${baseUrl}/${id}`),
  getOne: async (id: string, server?: boolean): Promise<TOrderResponse> =>
    handleApi(server).get(`${baseUrl}/${id}`)
}