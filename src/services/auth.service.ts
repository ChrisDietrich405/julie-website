import { BaseApi } from "@/services/base.service";
import { LoginRequest, LoginResponse } from "@/interfaces";

const baseUrl = '/api/auth'

export const AuthApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => BaseApi.post(`${baseUrl}`, data),
}
