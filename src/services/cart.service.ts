import { ApplicationApi } from "@/services/base.service";
import { ICartResponse } from "@/interfaces";

const baseUrl = "/cart";

export const CartApi = {
  get: (): Promise<ICartResponse> => ApplicationApi.get(`${baseUrl}`),
  update: (cart: string[]): Promise<void> =>
    ApplicationApi.put(`${baseUrl}`, { cart }),
  delete: (id: string): Promise<void> =>
    ApplicationApi.delete(`${baseUrl}/${id}/remove`),
};
