import {ApplicationApi} from "@/services/base.service";
import {ICartResponse} from "@/models";

const baseUrl = '/api/user/cart'

export const CartApi = {
  get: (): Promise<ICartResponse> => ApplicationApi.get(`${baseUrl}`),
  update: (cart: string[]): Promise<void> => ApplicationApi.put(`${baseUrl}`, {cart})
}
