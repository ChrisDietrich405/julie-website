import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AuthApi} from "@/services";
import {ILoginRequest, TLoginResponse} from "@/models";

type MutationOptions = UseMutationOptions<TLoginResponse, Error, ILoginRequest, unknown>;

export const useAuthLogin = (mutationOptions: MutationOptions = {}) =>
  useMutation<TLoginResponse, Error, ILoginRequest>({
    mutationKey: ['useAuthLogin'],
    mutationFn: (params: ILoginRequest) => AuthApi.login(params),
    ...mutationOptions
  })
