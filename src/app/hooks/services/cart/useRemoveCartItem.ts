import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CartApi} from "@/services";

type MutationOptions = UseMutationOptions<void, Error, string, unknown>;

export const useRemoveCartItem = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useRemoveCartItem'],
    mutationFn: (id: string) => CartApi.delete(id),
    ...mutationOptions
  })
