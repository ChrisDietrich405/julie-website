import { ApplicationApi, BaseApi } from "@/services/base.service";
import { UserBaseRequest, UserData } from "@/interfaces";
import { AxiosResponse } from "axios";

const baseUrl = "/user";

export const UserApi = {
  getOne: (): Promise<UserData> => ApplicationApi.get(`${baseUrl}`),
  create: (data: UserBaseRequest): Promise<AxiosResponse<void>> =>
    BaseApi.post(`${baseUrl}`, data),
};
