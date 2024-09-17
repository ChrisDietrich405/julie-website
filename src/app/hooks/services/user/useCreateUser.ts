import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {UserApi} from "@/services";
import { UserBaseRequest } from "@/interfaces";
import {AxiosError} from "axios";

type MutationOptions = UseMutationOptions<void, AxiosError<{message: string}>, UserBaseRequest, unknown>;

export const useCreateUser = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreateUser'],
    mutationFn: async (params: UserBaseRequest) => (await UserApi.create(params)).data,
    ...mutationOptions
  })
