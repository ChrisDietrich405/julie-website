import {ApplicationApi, BaseApi} from "@/services/base.service";
import {UserBaseRequest, User} from "@/interfaces";
import {AxiosResponse} from "axios";

const baseUrl = '/api/user'

export const UserApi = {
  getOne: (): Promise<User> => ApplicationApi.get(`${baseUrl}`),
  create: (data: UserBaseRequest): Promise<AxiosResponse<void>> => BaseApi.post(`${baseUrl}`, data),
}
