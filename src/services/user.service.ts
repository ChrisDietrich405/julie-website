import {ApplicationApi, BaseApi} from "@/services/base.service";
import {AxiosResponse} from "axios";
import {IAvailableWork, IUserResponse} from "@/models";

const baseUrl = '/api/user'

export const UserApi = {
  getOne: (): Promise<IUserResponse> => ApplicationApi.get(`${baseUrl}`)
}
