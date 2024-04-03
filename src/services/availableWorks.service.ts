import {BaseApi} from "@/services/base.service";

const baseUrl = '/api/available-works'

export const AvailableWorksApi = {
  getAll: async (): Promise<any> => {
    BaseApi.get(baseUrl)
  }
}