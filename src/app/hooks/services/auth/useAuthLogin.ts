import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {AuthApi} from "@/services";
import {LoginRequest, LoginResponse} from "@/interfaces/auth.interface";

type MutationOptions = UseMutationOptions<LoginResponse, Error, LoginRequest, unknown>;

export const useAuthLogin = (mutationOptions: MutationOptions = {}) =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ['useAuthLogin'],
    mutationFn: (params: LoginRequest) => AuthApi.login(params),
    ...mutationOptions
  })
