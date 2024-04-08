import {BaseApi} from "@/services/base.service";
import {AxiosResponse} from "axios";
import {IAvailableWork} from "@/models";

const baseUrl = '/api/available-works'

export const AvailableWorksApi = {
  getAll: async (): Promise<AxiosResponse<IAvailableWork[]>> => BaseApi.get(baseUrl),
  getOne: async (id: string | number): Promise<AxiosResponse<IAvailableWork>> => BaseApi.get(`${baseUrl}/${id}`)
}
