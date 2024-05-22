import {ApplicationApi, BaseApi} from "@/services/base.service";
import {ICartResponse, ILoginRequest, TLoginResponse} from "@/models";

const baseUrl = '/api/auth'

export const AuthApi = {
  login: (data: ILoginRequest): Promise<TLoginResponse> => BaseApi.post(`${baseUrl}`, data),
}
