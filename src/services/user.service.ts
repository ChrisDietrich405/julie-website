import {ApplicationApi, BaseApi} from "@/services/base.service";
import {INewUserBaseRequest, IUserResponse} from "@/models";

const baseUrl = '/api/user'

export const UserApi = {
  getOne: (): Promise<IUserResponse> => ApplicationApi.get(`${baseUrl}`),
  create: (data: INewUserBaseRequest): Promise<void> => BaseApi.post(`${baseUrl}`, data),
}
