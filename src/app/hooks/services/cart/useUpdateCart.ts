import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CartApi} from "@/services";

type MutationOptions = UseMutationOptions<void, Error, string[], unknown>;

export const useUpdateCart = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useUpdateCart'],
    mutationFn: (cart: string[]) => CartApi.update(cart),
    ...mutationOptions
  })
