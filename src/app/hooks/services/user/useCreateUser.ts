import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {UserApi} from "@/services";
import {INewUserBaseRequest} from "@/models";

type MutationOptions = UseMutationOptions<void, Error, INewUserBaseRequest, unknown>;

export const useCreateUser = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreateUser'],
    mutationFn: (params: INewUserBaseRequest) => UserApi.create(params),
    ...mutationOptions
  })
