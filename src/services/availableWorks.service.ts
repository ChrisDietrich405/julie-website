import {BaseApi} from "@/services/base.service";
import {AxiosResponse} from "axios";
import { AvailableWork } from "@/interfaces";

const baseUrl = '/api/available-works'

export const AvailableWorksApi = {
  getAll: async (): Promise<AxiosResponse<AvailableWork[]>> => BaseApi.get(baseUrl, { params: { status: 'available' } }),
  getOne: async (id: string | number): Promise<AxiosResponse<AvailableWork>> => BaseApi.get(`${baseUrl}/${id}`)
}
